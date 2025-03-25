// Function to toggle the mobile menu
function toggleMenu() {
    const navbar = document.querySelector('.mobile-navbar');
    navbar.classList.toggle('active');
}

let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

document.getElementById('nextBtn').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
});

// Auto-rotate testimonials every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}, 5000);

// Show the first slide initially
showSlide(currentSlide);

function filterProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const products = document.querySelectorAll('.gallery-item');
    
    products.forEach(product => {
        const productName = product.querySelector('h3').innerText.toLowerCase();
        const productCategory = product.getAttribute('data-category');

        const matchesSearch = productName.includes(searchInput);
        const matchesCategory = categoryFilter === "" || productCategory === categoryFilter;

        if (matchesSearch && matchesCategory) {
            product.style.display = ''; // Show product
        } else {
            product.style.display = 'none'; // Hide product
        }
    });
}

//FETCH DATA HTML// 
    async function performSearch() {
        // Get the search query from the input field
        let searchQuery = document.getElementById('search').value.toLowerCase();
        
        // Fetch the external properties data (properties.html)
        try {
            let response = await fetch('properties.html');
            let html = await response.text();

            // Parse the HTML and extract property names, categories, images, and links
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, 'text/html');
            
            // Get all property items
            let properties = doc.querySelectorAll('.gallery-item');

            // Clear previous search results
            document.getElementById('search-results').innerHTML = '';

            // Loop through each property and check if it matches the search query
            properties.forEach(property => {
                let propertyName = property.querySelector('h3') ? property.querySelector('h3').textContent.toLowerCase() : '';
                let propertyCategory = property.querySelector('h4') ? property.querySelector('h4').textContent.toLowerCase() : '';
                let propertyImage = property.querySelector('img') ? property.querySelector('img').src : '';
                let propertyLink = property.querySelector('a') ? property.querySelector('a').getAttribute('href') : '';
                let propertyPrice = property.querySelector('p') ? property.querySelector('p').textContent : '';

                // If either the name or the category matches the search query, show it
                if (propertyName.includes(searchQuery) || propertyCategory.includes(searchQuery)) {
                    // Create the search result item with image
                    let resultItem = document.createElement('div');
                    resultItem.classList.add('search-result-item');
                    resultItem.innerHTML = `
                        <div class="property-item">
                            <a href="${propertyLink}" class="property-link">
                                <img src="${propertyImage}" alt="${propertyName}" class="property-image">
                                <div class="property-details">
                                    <h3>${propertyName}</h3>
                                    <h4>${propertyCategory}</h4>
                                    <p>${propertyPrice}</p>
                                </div>
                            </a>
                        </div>
                    `;
                    // Append to the search results container
                    document.getElementById('search-results').appendChild(resultItem);
                }
            });

            // If no results found
            if (document.getElementById('search-results').children.length === 0) {
                document.getElementById('search-results').innerHTML = '<p>No results found.</p>';
            }
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    }