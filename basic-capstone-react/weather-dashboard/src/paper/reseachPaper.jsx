import React, { useState, useEffect } from 'react';
import { Search, FileDown, RefreshCcw } from 'lucide-react';

const ResearchExplorer = () => {
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    institution: '',
    journal: '',
    year: '',
    search: '',
    sortBy: 'title'
  });

  // Load papers data
  useEffect(() => {
    const loadPapers = async () => {
      try {
        setLoading(true);
        setError(null);
        fetch('papers.json')
    .then(response => response.json())
    .then(data => {
        papers = data;
        filteredPapers = [...papers];
        // eslint-disable-next-line no-undef
        renderPapers(filteredPapers);
        // eslint-disable-next-line no-undef
        populateFilters(papers);
    })
    .catch(error => console.error('Error loading data:', error));
        // Try different possible paths for the JSON file
        const possiblePaths = [
          '/weather-dashboard/public/papers.json',
          './papers.json',
          '../papers.json',
          'papers.json'
        ];

        let data = null;
        let loadError = null;

        for (const path of possiblePaths) {
          try {
            const response = await fetch(path);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            data = await response.json();
            break;
          } catch (e) {
            loadError = e;
            console.log(`Failed to load from ${path}:`, e);
            continue;
          }
        }

        if (data) {
          setPapers(data);
          setFilteredPapers(data);
        } else {
          throw loadError || new Error('Failed to load papers.json');
        }
      } catch (error) {
        console.error('Error loading papers:', error);
        setError('Failed to load papers. Please ensure papers.json is in the public folder.');
      } finally {
        setLoading(false);
      }
    };

    loadPapers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
          Research Papers Explorer
        </h1>

        {/* Filters Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search papers..."
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                disabled={loading || error}
              />
            </div>

            <select 
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
              disabled={loading || error}
            >
              <option value="">Select Institution</option>
            </select>

            <select
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
              disabled={loading || error}
            >
              <option value="">Select Journal</option>
            </select>

            <select
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
              disabled={loading || error}
            >
              <option value="">Select Year</option>
            </select>
          </div>

          <div className="flex justify-between items-center mt-4">
            <select
              className="w-48 p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500"
              disabled={loading || error}
            >
              <option value="title">Sort by Title</option>
              <option value="citations">Sort by Citations</option>
              <option value="year">Sort by Year</option>
              <option value="impact">Sort by Impact Factor</option>
            </select>

            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                disabled={loading}
              >
                <RefreshCcw size={18} />
                Reset
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                disabled={loading || error || filteredPapers.length === 0}
              >
                <FileDown size={18} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error Loading Data</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                  <p className="mt-2">Please ensure:</p>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>The papers.json file is in the public folder of your React project</li>
                    <li>The file is properly formatted JSON</li>
                    <li>The development server is running</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Data State */}
        {!loading && !error && filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No papers found</h3>
            <p className="mt-2 text-sm text-gray-500">Try adjusting your search criteria or check if papers.json is properly loaded.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchExplorer;