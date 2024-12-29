document.addEventListener('DOMContentLoaded', function() {
    const provinceSelect = document.getElementById('province');
    const citySelect = document.getElementById('city');
    const suburbSelect = document.getElementById('suburb');
    const items = document.querySelectorAll('.featured-items .item');
    const noResultsMessage = document.getElementById('no-results-message');

    // Dummy data for cities and suburbs based on province
    const locationData = {
        "Easterncape": {
            "city1": ["suburb1", "suburb2"],
            "city2": ["suburb3", "suburb4"]
        },
        "Freestate": {
            "city1": ["suburb5", "suburb6"]
        },
        "Gauteng": {
            "Johannesburg": ["Tembisa", "Kempton Park", "Midrand"],
            "Pretoria": ["suburb7", "suburb8"]
        },
        "KZN": {
            "city3": ["suburb7", "suburb8"]
        },
        "Limpopo": {
            "city3": ["suburb7", "suburb8"]
        },
        "Mpumalanga": {
            "city3": ["suburb7", "suburb8"]
        },
        "Northerncape": {
            "city3": ["suburb7", "suburb8"]
        },
        "Northwest": {
            "city3": ["suburb7", "suburb8"]
        },
        "Westerncape": {
            "city3": ["suburb7", "suburb8"]
        }
    };

    // Function to filter items
    function filterStores() {
        const selectedProvince = provinceSelect.value;
        const selectedCity = citySelect.value;
        const selectedSuburb = suburbSelect.value;
        let foundAtLeastOne = false;

        items.forEach(item => {
            const itemProvince = item.getAttribute('data-province');
            const itemCity = item.getAttribute('data-city');
            const itemSuburb = item.getAttribute('data-suburb');
            
            if (
                (selectedProvince === "" || itemProvince === selectedProvince) &&
                (selectedCity === "" || itemCity === selectedCity) &&
                (selectedSuburb === "" || itemSuburb === selectedSuburb)
            ) {
                item.style.display = 'block';
                foundAtLeastOne = true;
            } else {
                item.style.display = 'none';
            }
        });

        if (foundAtLeastOne) {
            noResultsMessage.style.display = 'none';
        } else {
            noResultsMessage.style.display = 'block';
        }
    }

    // Save the selected values to localStorage
    function saveSelection() {
        const selectedProvince = provinceSelect.value;
        const selectedCity = citySelect.value;
        const selectedSuburb = suburbSelect.value;
        
        localStorage.setItem('selectedProvince', selectedProvince);
        localStorage.setItem('selectedCity', selectedCity);
        localStorage.setItem('selectedSuburb', selectedSuburb);
    }

    // Update city options based on selected province
    provinceSelect.addEventListener('change', function() {
        const selectedProvince = provinceSelect.value;
        const cities = locationData[selectedProvince] || {};
        
        // Clear city and suburb select options
        citySelect.innerHTML = '<option value="">Select City</option>';
        suburbSelect.innerHTML = '<option value="">Select Suburb</option>';

        // Populate cities based on selected province
        Object.keys(cities).forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });

        // Re-filter and save the current selection
        saveSelection();
        filterStores();
    });

    // Update suburb options based on selected city
    citySelect.addEventListener('change', function() {
        const selectedProvince = provinceSelect.value;
        const selectedCity = citySelect.value;
        const suburbs = locationData[selectedProvince]?.[selectedCity] || [];

        // Clear suburb select options
        suburbSelect.innerHTML = '<option value="">Select Suburb</option>';

        // Populate suburbs based on selected city
        suburbs.forEach(suburb => {
            const option = document.createElement('option');
            option.value = suburb;
            option.textContent = suburb;
            suburbSelect.appendChild(option);
        });

        // Re-filter and save the current selection
        saveSelection();
        filterStores();
    });

    // Filter stores when suburb is selected
    suburbSelect.addEventListener('change', function() {
        saveSelection();
        filterStores();
    });

    // Retrieve the saved selection from localStorage and set the dropdown values
    function loadSavedSelection() {
        const savedProvince = localStorage.getItem('selectedProvince');
        const savedCity = localStorage.getItem('selectedCity');
        const savedSuburb = localStorage.getItem('selectedSuburb');

        if (savedProvince) {
            provinceSelect.value = savedProvince;
        }

        // Trigger the 'change' event for province to load the cities
        provinceSelect.dispatchEvent(new Event('change'));

        // After province change, set the city value if available
        if (savedCity) {
            citySelect.value = savedCity;
        }

        // Trigger the 'change' event for city to load the suburbs
        citySelect.dispatchEvent(new Event('change'));

        // Finally, set the suburb value if available
        if (savedSuburb) {
            suburbSelect.value = savedSuburb;
        }

        // Trigger the change event for suburb to filter stores
        suburbSelect.dispatchEvent(new Event('change'));
    }

    // Load saved selections when the page loads
    loadSavedSelection();
});

document.addEventListener("DOMContentLoaded", function () {
        const shortcutItems = document.querySelectorAll('.shortcut-item');  // Get all shortcut items
        const items = document.querySelectorAll('.items');  // Get all product items

        // Add click event listeners to the shortcut items
        shortcutItems.forEach(item => {
            item.addEventListener('click', function () {
                // Get the filter category from the clicked shortcut item
                const filterCategory = item.getAttribute('data-filter').toLowerCase(); // Ensure lowercase for matching

                // Loop through all items and hide/show based on the filter category
                items.forEach(product => {
                    const productCategory = product.getAttribute('data-category').toLowerCase();

                    // If the filter is "all", show all products; otherwise, filter by category
                    if (filterCategory === "all" || productCategory === filterCategory) {
                        product.style.display = 'block';  // Show product
                    } else {
                        product.style.display = 'none';  // Hide product
                    }
                });
            });
        });
    });

    // Add to Cart Function (for demonstration purposes)
    function addToCart(productName, price) {
        console.log(`Added ${productName} to cart for R${price}`);
        // Implement actual cart functionality here (localStorage, session, etc.)
    }

    document.addEventListener("DOMContentLoaded", function() {
        const toggleButton = document.getElementById('toggleButton');
        const filters = document.getElementById('filters');
        const featuredItems = document.getElementById('featuredItems');

        // Toggle the visibility of the sections
        toggleButton.addEventListener('click', function() {
            // Toggle visibility of sections
            const areFiltersVisible = filters.style.display === 'block';
            const areItemsVisible = featuredItems.style.display === 'block';
            
            if (areFiltersVisible && areItemsVisible) {
                // Hide both the filters and the featured items
                filters.style.display = 'none';
                featuredItems.style.display = 'none';
                toggleButton.textContent = 'Show Restaurants'; // Change button text
            } else {
                // Show both the filters and the featured items
                filters.style.display = 'block';
                featuredItems.style.display = 'block';
                toggleButton.textContent = 'Hide Restaurants'; // Change button text
            }
        });
    });