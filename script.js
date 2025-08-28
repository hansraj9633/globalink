document.addEventListener('alpine:init', () => {
    Alpine.data('darkMode', () => ({
        darkMode: false,
        mobileMenu: false,
        categoriesDropdown: false,
        currentLanguage: 'en',
        textSize: 'normal',
        carouselIndex: 0,
        
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            if (this.darkMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('darkMode', 'true');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('darkMode', 'false');
            }
        },
        
        toggleMobileMenu() {
            this.mobileMenu = !this.mobileMenu;
        },
        
        toggleCategoriesDropdown() {
            this.categoriesDropdown = !this.categoriesDropdown;
        },
        
        changeLanguage(lang) {
            this.currentLanguage = lang;
            // Add language change logic here
            console.log('Language changed to:', lang);
        },
        
        changeTextSize(size) {
            this.textSize = size;
            document.body.className = document.body.className.replace(/text-\w+/, '');
            document.body.classList.add(`text-${size}`);
        },
        
        nextSlide() {
            const newsItems = document.querySelectorAll('.news-item');
            this.carouselIndex = (this.carouselIndex + 1) % newsItems.length;
        },
        
        prevSlide() {
            const newsItems = document.querySelectorAll('.news-item');
            this.carouselIndex = this.carouselIndex === 0 ? newsItems.length - 1 : this.carouselIndex - 1;
        }
    }));
});

// Back to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.add('opacity-0', 'invisible');
            backToTopButton.classList.remove('opacity-100', 'visible');
        }
    }
});

// Add event listener to back to top button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', scrollToTop);
    }
    
    // Initialize dark mode from localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.documentElement.classList.add('dark');
    }
    
    // Initialize search functionality
    initializeSearch();
    initializeCarousel();
});

// Auto-slide carousel functionality
function initializeCarousel() {
    const carousels = document.querySelectorAll('[x-data*="carouselIndex"]');
    carousels.forEach(carousel => {
        const alpineComponent = Alpine.$data(carousel);
        if (alpineComponent && alpineComponent.news && alpineComponent.news.length > 1) {
            setInterval(() => {
                alpineComponent.nextSlide();
            }, 5000); // Change slide every 5 seconds
        }
    });
}

// Enhanced Search functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('input[placeholder*="Search"], input[placeholder*="search"]');
    
    searchInputs.forEach(input => {
        // Create search results container if it doesn't exist
        let searchResultsContainer = input.parentElement.querySelector('.search-results');
        if (!searchResultsContainer) {
            searchResultsContainer = document.createElement('div');
            searchResultsContainer.className = 'search-results absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg mt-1 z-50 max-h-64 overflow-y-auto hidden';
            input.parentElement.appendChild(searchResultsContainer);
        }
        
        // Add focus event to show recent searches
        input.addEventListener('focus', function() {
            showRecentSearches(searchResultsContainer);
        });
        
        // Add input event for live search
        input.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            if (searchTerm.length >= 2) {
                performSearch(searchTerm, searchResultsContainer);
            } else if (searchTerm.length === 0) {
                showRecentSearches(searchResultsContainer);
            } else {
                hideSearchResults(searchResultsContainer);
            }
        });
        
        // Add keyboard navigation
        input.addEventListener('keydown', function(e) {
            handleSearchKeyboardNavigation(e, searchResultsContainer, input);
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!input.parentElement.contains(e.target)) {
                hideSearchResults(searchResultsContainer);
            }
        });
    });
}

// Perform search based on search term
function performSearch(searchTerm, resultsContainer) {
    // Sample search data - in a real application, this would come from a database
    const searchData = [
        { type: 'article', title: 'Latest Technology Trends', category: 'Technology', url: 'technology.html' },
        { type: 'article', title: 'Global Economic Outlook', category: 'Business', url: 'business.html' },
        { type: 'article', title: 'Sports Championship Results', category: 'Sports', url: 'sports.html' },
        { type: 'article', title: 'International Relations Update', category: 'International', url: 'international.html' },
        { type: 'article', title: 'Entertainment Industry News', category: 'Entertainment', url: 'entertainment.html' },
        { type: 'category', title: 'Science News', category: 'Science', url: 'science.html' },
        { type: 'category', title: 'Education Updates', category: 'Education', url: 'education.html' },
        { type: 'category', title: 'Lifestyle & Health', category: 'Lifestyle', url: 'lifestyle.html' },
        { type: 'category', title: 'National News', category: 'National', url: 'national.html' },
        { type: 'category', title: 'Opinion & Editorial', category: 'Opinion', url: 'opinion.html' }
    ];
    
    // Filter search data based on search term
    const filteredResults = searchData.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    ).slice(0, 8); // Limit to 8 results
    
    displaySearchResults(filteredResults, resultsContainer, searchTerm);
}

// Display search results in the container
function displaySearchResults(results, container, searchTerm) {
    if (results.length === 0) {
        container.innerHTML = `
            <div class="p-4 text-center text-gray-500 dark:text-gray-400">
                <i class="fas fa-search mb-2 text-xl"></i>
                <p>No results found for "${searchTerm}"</p>
                <p class="text-sm mt-1">Try different keywords or browse categories</p>
            </div>
        `;
    } else {
        container.innerHTML = results.map(result => `
            <a href="${result.url}" class="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                <div class="flex items-center">
                    <i class="fas fa-${result.type === 'article' ? 'newspaper' : 'folder'} text-blue-500 mr-3"></i>
                    <div class="flex-1">
                        <div class="font-medium text-gray-900 dark:text-white">${highlightSearchTerm(result.title, searchTerm)}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 capitalize">${result.category}</div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
                </div>
            </a>
        `).join('');
    }
    
    showSearchResults(container);
}

// Highlight search term in results
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>');
}

// Show recent searches
function showRecentSearches(container) {
    const recentSearches = getRecentSearches();
    
    if (recentSearches.length === 0) {
        container.innerHTML = `
            <div class="p-4">
                <div class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Popular Categories</div>
                <div class="space-y-1">
                    <a href="trending.html" class="block px-2 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <i class="fas fa-fire mr-2"></i>Trending
                    </a>
                    <a href="technology.html" class="block px-2 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <i class="fas fa-microchip mr-2"></i>Technology
                    </a>
                    <a href="business.html" class="block px-2 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <i class="fas fa-chart-line mr-2"></i>Business
                    </a>
                    <a href="sports.html" class="block px-2 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <i class="fas fa-futbol mr-2"></i>Sports
                    </a>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="p-4">
                <div class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recent Searches</div>
                ${recentSearches.map(search => `
                    <div class="flex items-center justify-between px-2 py-1 text-sm">
                        <span class="text-gray-600 dark:text-gray-400">${search}</span>
                        <button onclick="removeRecentSearch('${search}')" class="text-gray-400 hover:text-red-500">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    showSearchResults(container);
}

// Get recent searches from localStorage
function getRecentSearches() {
    const recent = localStorage.getItem('recentSearches');
    return recent ? JSON.parse(recent) : [];
}

// Add search to recent searches
function addRecentSearch(searchTerm) {
    const recent = getRecentSearches();
    const filtered = recent.filter(term => term !== searchTerm);
    const updated = [searchTerm, ...filtered].slice(0, 5); // Keep only 5 recent searches
    localStorage.setItem('recentSearches', JSON.stringify(updated));
}

// Remove search from recent searches
function removeRecentSearch(searchTerm) {
    const recent = getRecentSearches();
    const filtered = recent.filter(term => term !== searchTerm);
    localStorage.setItem('recentSearches', JSON.stringify(filtered));
    // Refresh the display
    const activeResultsContainer = document.querySelector('.search-results:not(.hidden)');
    if (activeResultsContainer) {
        showRecentSearches(activeResultsContainer);
    }
}

// Show search results container
function showSearchResults(container) {
    container.classList.remove('hidden');
    container.classList.add('block');
}

// Hide search results container
function hideSearchResults(container) {
    container.classList.add('hidden');
    container.classList.remove('block');
}

// Handle keyboard navigation in search results
function handleSearchKeyboardNavigation(e, container, input) {
    const results = container.querySelectorAll('a');
    const currentIndex = Array.from(results).findIndex(result => result.classList.contains('bg-gray-100') || result.classList.contains('dark:bg-gray-700'));
    
    switch(e.key) {
        case 'ArrowDown':
            e.preventDefault();
            if (currentIndex < results.length - 1) {
                results[currentIndex]?.classList.remove('bg-gray-100', 'dark:bg-gray-700');
                results[currentIndex + 1]?.classList.add('bg-gray-100', 'dark:bg-gray-700');
            }
            break;
        case 'ArrowUp':
            e.preventDefault();
            if (currentIndex > 0) {
                results[currentIndex]?.classList.remove('bg-gray-100', 'dark:bg-gray-700');
                results[currentIndex - 1]?.classList.add('bg-gray-100', 'dark:bg-gray-700');
            }
            break;
        case 'Enter':
            e.preventDefault();
            const highlightedResult = container.querySelector('a.bg-gray-100, a.dark\\:bg-gray-700');
            if (highlightedResult) {
                highlightedResult.click();
            }
            break;
        case 'Escape':
            hideSearchResults(container);
            input.blur();
            break;
    }
}

// Handle search form submission
function handleSearchSubmit(e) {
    e.preventDefault();
    const searchInput = e.target.querySelector('input[type="text"]');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        addRecentSearch(searchTerm);
        // Redirect to search results page or perform search
        console.log('Search submitted:', searchTerm);
        // For demo purposes, just log the search term
        alert(`Searching for: ${searchTerm}\nThis would redirect to search results page in a real application.`);
    }
}

// Add search form submission handlers
document.addEventListener('DOMContentLoaded', function() {
    const searchForms = document.querySelectorAll('form');
    searchForms.forEach(form => {
        if (form.querySelector('input[placeholder*="Search"], input[placeholder*="search"]')) {
            form.addEventListener('submit', handleSearchSubmit);
        }
    });
});
