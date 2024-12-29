
// Hamburger menu for mobile view
document.getElementById('hamburger').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
});

// Close menu
document.getElementById('close').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.remove('show');
});


function filterProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const products = document.querySelectorAll('.product');
    
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

function changeImage(newImage) {
    const productImage = event.target.closest('.product').querySelector('.product-image');
    productImage.src = newImage; // Change the image source
}

// Event listener to handle input changes
document.getElementById("searchInput").addEventListener("input", filterProducts);

//ABOUT US ANIMATION//
document.addEventListener("DOMContentLoaded", function () {
  const animatedSection = document.querySelector(".about-text");

  // Function to check if an element is in the viewport
  const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.8; // Trigger when it's about 80% into view
  };

  const handleScrollAnimation = () => {
    if (isInViewport(animatedSection)) {
      animatedSection.classList.add("show");
    }
  };

  // Trigger animation on scroll
  window.addEventListener("scroll", handleScrollAnimation);

  // Trigger on page load in case it's already in view
  handleScrollAnimation();
});

//TESTIMONIALS//
document.addEventListener("DOMContentLoaded", function () {
  const testimonials = document.querySelectorAll(".testimonial");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  let currentIndex = 0;

  const showTestimonial = (index) => {
    testimonials.forEach((testimonial, idx) => {
      // Hide all testimonials
      testimonial.style.opacity = 0;
      testimonial.style.transform = "translateX(100%)";
    });

    // Show only the current testimonial
    testimonials[index].style.opacity = 1;
    testimonials[index].style.transform = "translateX(0)";
  };

  const showNextTestimonial = () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  };

  const showPreviousTestimonial = () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  };

  prevButton.addEventListener("click", showPreviousTestimonial);
  nextButton.addEventListener("click", showNextTestimonial);

  // Initialize the first testimonial view
  showTestimonial(currentIndex);

  // Optional: Auto-rotate testimonials every 5 seconds
  setInterval(showNextTestimonial, 5000);
});

//CONTACT FORM//
function sendMessage() {
      const fullName = document.getElementById("fullName").value;
      const email = document.getElementById("email").value;
      const contactNumber = document.getElementById("contactNumber").value;
      const address = document.getElementById("address").value;
      const messageContent = document.getElementById("message").value;

      const message = 
        `Full Name: ${fullName}%0A` +
        `Email: ${email}%0A` +
        `Contact Number: ${contactNumber}%0A` +
        `Address: ${address}%0A` +
        `Message: ${messageContent}`;

      const whatsappNumber = '27726962588'; // Replace with your WhatsApp number

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappURL, '_blank');
    }
	
//FAQ QUESTIONS//	
// Function to toggle answers in the FAQ
        function toggleAnswer(index) {
            const answers = document.querySelectorAll('.faq-answer');
            const questions = document.querySelectorAll('.faq-question span');

            // Collapse all other answers
            answers.forEach((answer, i) => {
                if (i !== index) {
                    answer.style.display = 'none';
                    questions[i * 2 + 1].innerHTML = '&#9660;';
                }
            });

            // Toggle the clicked answer
            const currentAnswer = answers[index];
            const currentIcon = questions[index * 2 + 1];

            if (currentAnswer.style.display === 'block') {
                currentAnswer.style.display = 'none';
                currentIcon.innerHTML = '&#9660;';
            } else {
                currentAnswer.style.display = 'block';
                currentIcon.innerHTML = '&#9650;';
            }
        }

// Function to filter products dynamically
    function filterProducts() {
      const searchInput = document.getElementById('searchInput').value.toLowerCase();
      const categoryFilter = document.getElementById('categoryFilter').value;
      const products = document.querySelectorAll('.product');

      products.forEach(product => {
        const productName = product.querySelector('p').textContent.toLowerCase();
        const productCategory = product.dataset.category;

        const matchesSearch = productName.includes(searchInput);
        const matchesCategory = !categoryFilter || productCategory === categoryFilter;

        if (matchesSearch && matchesCategory) {
          product.classList.add('active');
        } else {
          product.classList.remove('active');
        }
      });
    }

    // Automatically filter based on URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');

    // If there is a filter in the URL, apply it
    if (filter) {
      document.getElementById('categoryFilter').value = filter; // Pre-select the category filter
      filterProducts(); // Apply the filter immediately
    } else {
      // If no filter, show all products
      const products = document.querySelectorAll('.product');
      products.forEach(product => {
        product.classList.add('active');
      });
    }

    // Event listener for changes to filter or search input
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    document.getElementById('searchInput').addEventListener('input', filterProducts);
	


// Get modal and image elements
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    var captionText = document.getElementById("caption");
    var closeBtn = document.getElementById("closeModal");

    // Get all gallery images
    var galleryImages = document.querySelectorAll('.gallery-item img');

    // Add event listeners to images
    galleryImages.forEach(function(img) {
      img.addEventListener("click", function() {
        modal.style.display = "flex";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
      });
    });

    // Close the modal when clicking on the close button
    closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
    });

    // Close the modal when clicking anywhere outside the image
    window.addEventListener("click", function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
	


