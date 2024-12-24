// Product data and state management
let productsData = null;
let searchTimeout = null;

// Product loading and display functions
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        productsData = await response.json();
        displayProducts(productsData.products);
        populateCategories(productsData.categories);
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('productGrid').innerHTML = 
            '<p>Error loading products. Please try again later.</p>';
    }
}

function displayProducts(products) {
    const productGrid = document.getElementById('productGrid');
    
    productGrid.innerHTML = products.map(product => {
        const imageUrl = product.image || product.displayImage || '/api/placeholder/300/300';
        
        return `
        <div class="product">
            <img src="${imageUrl}" 
                 alt="${product.name}"
                 onerror="this.onerror=null; this.src='${product.displayImage}'">
            <h3>${product.name}</h3>
            <div class="rating">
                Rating: ${product.rating}/5 (${product.reviews} reviews)
            </div>
            <p class="price">$${product.price.toFixed(2)}</p>
            <div class="product-categories">
                ${product.categories.map(cat => 
                    `<span class="category-tag">${cat}</span>`
                ).join('')}
            </div>
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
        </div>
    `}).join('');
}

// Filter functions
function populateCategories(categories) {
    const categoryFilter = document.getElementById('category-filter');
    categoryFilter.innerHTML = '<option value="">All Categories</option>' +
        categories.map(category => 
            `<option value="${category}">${category}</option>`
        ).join('');
}

function applyFilters() {
    if (!productsData) return;

    let filtered = productsData.products;
    
    const category = document.getElementById('category-filter').value;
    if (category) {
        filtered = filtered.filter(product => 
            product.categories.includes(category)
        );
    }

    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    filtered = filtered.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );

    const minRating = parseFloat(document.getElementById('rating-filter').value) || 0;
    filtered = filtered.filter(product => product.rating >= minRating);

    displayProducts(filtered);
}

// Search and suggestion functions
function showSuggestions() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    let suggestionsDiv = document.querySelector('.search-suggestions');
    if (!suggestionsDiv) {
        suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'search-suggestions';
        searchInput.parentNode.appendChild(suggestionsDiv);
    }

    suggestionsDiv.innerHTML = '';

    if (query) {
        const matches = productsData.products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.alternativeNames.some(name => name.toLowerCase().includes(query))
        );

        if (matches.length > 0) {
            matches.forEach(product => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" style="width: 40px; height: 40px; object-fit: cover;">
                    <div>
                        <div>${highlightMatch(product.name, query)}</div>
                        <div style="font-size: 12px; color: #666;">
                            $${product.price.toFixed(2)} • ${product.rating}★ (${product.reviews})
                        </div>
                    </div>
                `;
                div.onclick = () => {
                    searchInput.value = product.name;
                    suggestionsDiv.style.display = 'none';
                    searchProducts();
                };
                suggestionsDiv.appendChild(div);
            });

            const similarSearches = new Set();
            matches.forEach(product => {
                product.alternativeNames.forEach(name => {
                    if (name.toLowerCase().includes(query)) {
                        similarSearches.add(name);
                    }
                });
            });

            if (similarSearches.size > 0) {
                const similarDiv = document.createElement('div');
                similarDiv.className = 'suggestion-item';
                similarDiv.innerHTML = `
                    <div style="font-size: 12px; color: #666; padding: 5px 0;">
                        Similar searches: ${Array.from(similarSearches).slice(0, 3).join(', ')}
                    </div>
                `;
                suggestionsDiv.appendChild(similarDiv);
            }

            suggestionsDiv.style.display = 'block';
        } else {
            const corrections = productsData.searchSuggestions.corrections;
            const possibleCorrection = Object.entries(corrections)
                .find(([incorrect]) => incorrect.includes(query) || query.includes(incorrect));
            
            if (possibleCorrection) {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.innerHTML = `
                    <div>Did you mean: <strong>${possibleCorrection[1]}</strong>?</div>
                `;
                div.onclick = () => {
                    searchInput.value = possibleCorrection[1];
                    suggestionsDiv.style.display = 'none';
                    searchProducts();
                };
                suggestionsDiv.appendChild(div);
                suggestionsDiv.style.display = 'block';
            }
        }
    } else {
        suggestionsDiv.style.display = 'none';
    }
}

function searchProducts() {
    if (!productsData) return;

    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = productsData.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.alternativeNames.some(name => 
            name.toLowerCase().includes(searchTerm)
        )
    );
    displayProducts(filtered);
}

// Utility functions
function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}

function addToCart(productId) {
    alert(`Product ${productId} added to cart!`);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(showSuggestions, 300);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-bar')) {
            const suggestionsDiv = document.querySelector('.search-suggestions');
            if (suggestionsDiv) {
                suggestionsDiv.style.display = 'none';
            }
        }
    });
});