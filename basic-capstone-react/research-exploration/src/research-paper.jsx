import React, { useState, useEffect } from 'react';
import { Loader2, Search } from "lucide-react";
import { ArrowLeft } from "lucide-react"; // Add ArrowLeft import

import './app.css'
const ITEMS_PER_PAGE = 8;

export default function ResearchPapersExplorer() {
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    institution: '',
    journal: '',
    year: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    institutions: new Set(),
    journals: new Set(),
    years: new Set(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('papers.json');
        const data = await response.json();
        setPapers(data);
        setFilteredPapers(data);
        populateFilterOptions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const populateFilterOptions = (data) => {
    const options = {
      institutions: new Set(),
      journals: new Set(),
      years: new Set(),
    };

    data.forEach(paper => {
      if (paper.Institution) options.institutions.add(paper.Institution);
      if (paper.Journal) options.journals.add(paper.Journal);
      if (paper.Year) options.years.add(paper.Year);
    });

    setFilterOptions(options);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    applyFilters(query, filters);
  };

  const handleFilterChange = (value, filterType) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    setCurrentPage(1);
    applyFilters(searchQuery, newFilters);
  };

  const applyFilters = (query, currentFilters) => {
    let result = [...papers];

    if (query) {
      const lowercaseQuery = query.toLowerCase();
      result = result.filter(paper => (
        paper.Title?.toLowerCase().includes(lowercaseQuery) ||
        paper.Authors?.toLowerCase().includes(lowercaseQuery) ||
        paper.Journal?.toLowerCase().includes(lowercaseQuery) ||
        paper.Institution?.toLowerCase().includes(lowercaseQuery) ||
        paper.Field?.toLowerCase().includes(lowercaseQuery) ||
        String(paper.Year).includes(lowercaseQuery)
      ));
    }

    if (currentFilters.institution) {
      result = result.filter(paper => paper.Institution === currentFilters.institution);
    }
    if (currentFilters.journal) {
      result = result.filter(paper => paper.Journal === currentFilters.journal);
    }
    if (currentFilters.year) {
      result = result.filter(paper => paper.Year === parseInt(currentFilters.year));
    }

    setFilteredPapers(result);
  };

  const resetFilters = () => {
    setFilters({ institution: '', journal: '', year: '' });
    setSearchQuery('');
    setFilteredPapers(papers);
    setCurrentPage(1);
  };

  const exportData = () => {
    if (filteredPapers.length === 0) {
      alert('No papers to export.');
      return;
    }

    const headers = ["Title", "Authors", "Journal", "Year", "Citations", 
                    "Institution", "Field", "Impact_Factor", "DOI", "Keywords"];
    const csvContent = [
      headers.join(','),
      ...filteredPapers.map(paper => 
        headers.map(header => 
          `"${(paper[header] || '').toString().replace(/"/g, '""')}"`
        ).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filtered_papers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const BackButton = () => (
    <button
      onClick={() => window.location.href = 'https://stellular-marshmallow-b77b25.netlify.app/'}
      className="absolute left-4 bottom-4 flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg transition-all duration-200 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
    >
      <ArrowLeft size={20} />
      Back
    </button>
  );
  if (loading) {
    return (
      <div className="loader-container">
        <Loader2 className="loader" />
      </div>
    );
  }

  const totalPages = Math.ceil(filteredPapers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPapers = filteredPapers.slice(startIndex, endIndex);

 

  return (
    <div className="explorer-container relative">
      <h1 className="explorer-title">Research Papers Explorer</h1>

      <div className="controls-container">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search papers..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-container">
          <select
            value={filters.institution}
            onChange={(e) => handleFilterChange(e.target.value, 'institution')}
            className="filter-select"
          >
            <option value="">Select Institution</option>
            {[...filterOptions.institutions].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <select
            value={filters.journal}
            onChange={(e) => handleFilterChange(e.target.value, 'journal')}
            className="filter-select"
          >
            <option value="">Select Journal</option>
            {[...filterOptions.journals].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <select
            value={filters.year}
            onChange={(e) => handleFilterChange(e.target.value, 'year')}
            className="filter-select"
          >
            <option value="">Select Year</option>
            {[...filterOptions.years].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="buttons-container">
          <button onClick={resetFilters} className="reset-button">Reset Filters</button>
          <button onClick={exportData} className="export-button">Export Data</button>
        </div>
      </div>

      {filteredPapers.length === 0 ? (
        <div className="no-results">
          <h3>No papers found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="papers-grid">
          {currentPapers.map((paper, index) => (
            <div key={index} className="paper-card">
              <h2 className="paper-title">{paper.Title}</h2>
              <div className="paper-details">
                <div><span>Authors:</span> {paper.Authors}</div>
                <div><span>Journal:</span> {paper.Journal}</div>
                <div><span>Year:</span> {paper.Year}</div>
                <div><span>Citations:</span> {paper.Citations}</div>
                <div><span>Institution:</span> {paper.Institution}</div>
                <div><span>Field:</span> {paper.Field}</div>
                <div><span>Impact Factor:</span> {paper.Impact_Factor}</div>
                {paper.DOI && <div><span>DOI:</span> {paper.DOI}</div>}
                {paper.Keywords && <div><span>Keywords:</span> {paper.Keywords}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredPapers.length > 0 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="page-button"
          >
            Previous
          </button>
          
          {[1, 2, 3, 4, 5].map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`page-button ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
          
          {totalPages > 5 && <span className="page-ellipsis">...</span>}
          
          {totalPages > 5 && (
            <button
              onClick={() => setCurrentPage(totalPages)}
              className={`page-button ${currentPage === totalPages ? 'active' : ''}`}
            >
              {totalPages}
            </button>
          )}
          
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="page-button"
          >
            Next
          </button>
        </div>
      )}
      <BackButton/>
    </div>
  );
}

