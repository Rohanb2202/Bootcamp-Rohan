// Simulate fetching data (in reality, this would be fetched from a backend)
let papers = []; // This will store the fetched papers
let filteredPapers = []; // This will store the filtered papers

const itemsPerPage = 8; // Number of items per page
let currentPage = 1; // Track the current page

// Load JSON data
fetch('papers.json')
    .then(response => response.json())
    .then(data => {
        papers = data;
        filteredPapers = [...papers];
        renderPapers(filteredPapers);
        populateFilters(papers);
    })
    .catch(error => console.error('Error loading data:', error));

/* Main pagination functionality */
function renderPaginationControls(totalItems) {
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = ''; // Clear existing buttons

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Helper function to create a page button
    const createPageButton = (page) => {
        const pageButton = document.createElement('button');
        pageButton.textContent = page;
        pageButton.className = currentPage === page ? 'active' : '';
        pageButton.onclick = () => {
            currentPage = page;
            renderPapers(filteredPapers);
        };
        return pageButton;
    };

    // Previous Button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Prev';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => {
        currentPage--;
        renderPapers(filteredPapers);
    };
    paginationControls.appendChild(prevButton);

    // Page Buttons with Ellipsis Logic
    if (totalPages <= 7) {
        // Show all pages if there are 7 or fewer
        for (let i = 1; i <= totalPages; i++) {
            paginationControls.appendChild(createPageButton(i));
        }
    } else {
        // Always show the first and last page
        paginationControls.appendChild(createPageButton(1));

        if (currentPage > 4) {
            // Add an ellipsis before the current range
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.className = 'ellipsis';
            paginationControls.appendChild(ellipsis);
        }

        // Show 2 pages before and after the current page
        const startPage = Math.max(2, currentPage - 2);
        const endPage = Math.min(totalPages - 1, currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            paginationControls.appendChild(createPageButton(i));
        }

        if (currentPage < totalPages - 3) {
            // Add an ellipsis after the current range
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.className = 'ellipsis';
            paginationControls.appendChild(ellipsis);
        }

        paginationControls.appendChild(createPageButton(totalPages));
    }

    // Next Button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => {
        currentPage++;
        renderPapers(filteredPapers);
    };
    paginationControls.appendChild(nextButton);
}

// Render papers
function renderPapers(papers) {
    const papersList = document.getElementById('papers-list');
    papersList.innerHTML = ''; // Clear existing papers

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, papers.length);

    const currentPageData = papers.slice(startIndex, endIndex);

    currentPageData.forEach(paper => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3 class="paper-title">${paper.Title || 'Untitled'}</h3>
            <p class="paper-meta">Authors: ${paper.Authors || 'Unknown'}</p>
            <p class="paper-meta">Journal: ${paper.Journal || 'N/A'}</p>
            <p class="paper-meta">Year: ${paper.Year || 'Unknown'}</p>
            <p class="paper-meta">Citations: ${paper.Citations || '0'}</p>
            <p class="paper-meta">Institution: ${paper.Institution || 'Unknown'}</p>
            <p class="paper-meta">Field: ${paper.Field || 'Uncategorized'}</p>
            <p class="paper-meta">Impact Factor: ${paper.Impact_Factor || 'N/A'}</p>
            <p class="paper-meta">DOI: ${paper.DOI || 'N/A'}</p>
            <p class="paper-keywords">Keywords: ${paper.Keywords || 'None'}</p>
        `;
        papersList.appendChild(card);
    });

    renderPaginationControls(papers.length);
}

// Populate filter options
function populateFilters(papers) {
    const institutions = new Set();
    const journals = new Set();
    const years = new Set();

    papers.forEach(paper => {
        institutions.add(paper.Institution);
        journals.add(paper.Journal);
        years.add(paper.Year);
    });

    const institutionFilter = document.getElementById('institution-filter');
    const journalFilter = document.getElementById('journal-filter');
    const yearFilter = document.getElementById('year-filter');

    // Populate institution filter
    institutions.forEach(institution => {
        const option = document.createElement('option');
        option.value = institution;
        option.textContent = institution;
        institutionFilter.appendChild(option);
    });

    // Populate journal filter
    journals.forEach(journal => {
        const option = document.createElement('option');
        option.value = journal;
        option.textContent = journal;
        journalFilter.appendChild(option);
    });

    // Populate year filter
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

// Filter papers based on selected filters
function filterPapers() {
    const institution = document.getElementById('institution-filter').value;
    const journal = document.getElementById('journal-filter').value;
    const year = document.getElementById('year-filter').value;

    filteredPapers = papers.filter(paper => {
        return (
            (!institution || paper.Institution === institution) &&
            (!journal || paper.Journal === journal) &&
            (!year || paper.Year === Number(year))
        );
    });

    currentPage = 1;
    renderPapers(filteredPapers);
}

// Search papers by title, author, or tags
function searchPapers() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    filteredPapers = papers.filter(paper => {
        return (
            paper.Authors.toLowerCase().includes(query) ||
            paper.Citations == query ||
            // paper.DOI.toLowerCase().includes(query) ||
            paper.Field.toLowerCase().includes(query) ||
            paper.Impact_Factor == query ||
            paper.Institution.toLowerCase().includes(query) ||
            paper.Journal.toLowerCase().includes(query) ||
            paper.Title.toLowerCase().includes(query) ||
            paper.Year == query
        );
    });

    currentPage = 1;
    renderPapers(filteredPapers);
}

// Reset Action
function resetFilters() {
    // Reset the search bar
    document.getElementById('search-bar').value = '';

    // Reset dropdown selections
    document.getElementById('institution-filter').value = '';
    document.getElementById('journal-filter').value = '';
    document.getElementById('year-filter').value = '';

    currentPage = 1;
    renderPapers(papers);
}

// Export the filtered papers as a zip file
function exportData() {
    const zip = new JSZip();

    if (filteredPapers.length === 0) {
        alert('No papers to export.');
        return;
    }

    // Generate CSV content
    const headers = [
        "Title",
        "Authors",
        "Journal",
        "Year",
        "Citations",
        "Institution",
        "Field",
        "Impact_Factor",
        "DOI",
        "Keywords"
    ];

    const csvRows = [headers.join(',')]; // Add headers row
    filteredPapers.forEach(paper => {
        const row = headers.map(header => {
            // Escape commas and quotes in values
            const value = paper[header] || '';
            return `"${value.toString().replace(/"/g, '""')}"`;
        });
        csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    zip.file('filtered_papers.csv', csvContent);

    // Generate zip file and download
    zip.generateAsync({ type: 'blob' }).then(function (content) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'filtered_papers.zip';
        link.click();
    }).catch(error => {
        console.error('Error generating zip:', error);
    });


    function showLoading(show) {
        const spinner = document.getElementById('loading-spinner');
        spinner.style.display = show ? 'block' : 'none';
    }

    // Enhanced render function with animations
    function renderPapers(papers) {
        const papersList = document.getElementById('papers-list');
        papersList.innerHTML = '';

        if (papers.length === 0) {
            papersList.innerHTML = `
                <div class="no-results">
                    <h3>No papers found</h3>
                    <p>Try adjusting your search criteria</p>
                </div>
            `;
            return;
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, papers.length);
        const currentPageData = papers.slice(startIndex, endIndex);

        currentPageData.forEach((paper, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.animationDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <h3 class="paper-title">${paper.Title || 'Untitled'}</h3>
                <p class="paper-meta"><strong>Authors:</strong> ${paper.Authors || 'Unknown'}</p>
                <p class="paper-meta"><strong>Journal:</strong> ${paper.Journal || 'N/A'}</p>
                <p class="paper-meta"><strong>Year:</strong> ${paper.Year || 'Unknown'}</p>
                <p class="paper-meta"><strong>Citations:</strong> ${paper.Citations || '0'}</p>
                <p class="paper-meta"><strong>Institution:</strong> ${paper.Institution || 'Unknown'}</p>
                <p class="paper-meta"><strong>Impact Factor:</strong> ${paper.Impact_Factor || 'N/A'}</p>
            `;
            papersList.appendChild(card);
        });

        renderPaginationControls(papers.length);
    }

    // Initialize with loading state
    document.addEventListener('DOMContentLoaded', () => {
        showLoading(true);
        fetch('papers.json')
            .then(response => response.json())
            .then(data => {
                papers = data;
                filteredPapers = [...papers];
                renderPapers(filteredPapers);
                populateFilters(papers);
                showLoading(false);
            })
            .catch(error => {
                console.error('Error loading data:', error);
                showLoading(false);
            });
    });

}