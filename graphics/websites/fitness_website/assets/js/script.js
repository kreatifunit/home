//---TRADEMARK SECTION---//
    // Function to open the popup
    function openPopup() {
      document.getElementById("popup").style.display = "flex";
    }

    // Function to close the popup
    function closePopup() {
      document.getElementById("popup").style.display = "none";
    }

    // Open the popup automatically when the page loads
    window.onload = function() {
      openPopup();
    }


// Toggle mobile menu visibility
function toggleMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.style.display = (mobileMenu.style.display === 'block') ? 'none' : 'block';
}

//BANNER SLIDE//
let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    slideIndex++;
    
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    slides[slideIndex - 1].style.display = "block";  
    
    setTimeout(showSlides, 4000); // Change slide every 4 seconds
}

showSlides(); // Initialize the slideshow