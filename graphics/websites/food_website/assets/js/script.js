let cart = [];

// Initialize or retrieve the cart from local storage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Save the cart to local storage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productName, price) {
    const cart = getCart();
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    saveCart(cart);
    showCartPopup(productName); // Show the popup instead of alert
}

// Function to show a cart notification popup
function showCartPopup(productName) {
    const popup = document.getElementById("cart-popup");
    const message = document.getElementById("cart-message");
    
    message.textContent = `"${productName}" has been added to your cart.`;
    popup.style.display = "flex";

    // Automatically hide popup after 3 seconds
    setTimeout(() => {
        popup.style.display = "none";
    }, 2000);
}

// Function to close the cart popup
function closeCartPopup() {
    document.getElementById("cart-popup").style.display = "none";
}


// View cart function
function viewCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartSummary = document.querySelector('.cart-summary');
    const billingAddress = document.querySelector('.billing-address');
    const paymentMethods = document.querySelector('.payment-methods');
    const deliveryOptions = document.querySelector('.delivery-options');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    
    cartItemsContainer.innerHTML = ''; // Clear previous items
    let total = 0;

    if (cart.length === 0) {
        // Show empty cart message and hide other sections
        emptyCartMessage.style.display = 'none';
        cartSummary.style.display = 'none';
        billingAddress.style.display = 'none';
        paymentMethods.style.display = 'none';
        deliveryOptions.style.display = 'none';
        cartTotalContainer.innerHTML = 'Total: R 0.00';
        placeOrderBtn.disabled = true;
    } else {
        // Show cart items and update total
        emptyCartMessage.style.display = 'none';
        cartSummary.style.display = 'block';
        billingAddress.style.display = 'block';
        paymentMethods.style.display = 'block';
        deliveryOptions.style.display = 'block';

        cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItemDiv = document.createElement('div');
    cartItemDiv.className = 'cart-item';

    // Create a div for product details and quantity buttons to ensure alignment
    cartItemDiv.innerHTML = `
        <div class="cart-item-details">
            <span class="cart-item-name">${item.name} - R ${item.price} x ${item.quantity} = R ${itemTotal.toFixed(2)}</span>
            <div class="quantity-buttons">
                <button class="quantity-btn" onclick="changeQuantity('${item.name}', -1)">-</button>
                <button class="quantity-btn" onclick="changeQuantity('${item.name}', 1)">+</button>
            </div>
        </div>
    `;
    cartItemsContainer.appendChild(cartItemDiv);
});


        cartTotalContainer.innerHTML = `Total: R ${total.toFixed(2)}`;
        updatePlaceOrderButton(); // Update the Place Order button
    }
    
    document.getElementById('cartModal').style.display = 'block';
    updatePlaceOrderButton(); // Update Place Order button state
}

// Change quantity of cart items
function changeQuantity(productName, change) {
    const cart = getCart();
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex > -1) {
        cart[productIndex].quantity += change;
        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1); // Remove item if quantity is 0
        }
    }

    saveCart(cart);
    viewCart(); // Refresh cart view
}

// Clear cart function
function clearCart() {
    localStorage.removeItem('cart');
    viewCart(); // Refresh cart view
}

// Update Delivery Cost based on the selected option
function updateDeliveryCost() {
	const cart = getCart(); // Get the current cart items
    const deliveryOption = document.getElementById('deliveryOption').value; // Get selected delivery option from dropdown
    let additionalCost = 0;

    if (deliveryOption === 'delivery') {
        additionalCost = 19.99; // Example delivery cost
    }

    // Display delivery cost
    const deliveryCostElement = document.getElementById('additionalCost');
    if (additionalCost) {
        deliveryCostElement.style.display = 'block';
        deliveryCostElement.textContent = `Delivery Cost: R ${additionalCost.toFixed(2)}`;
    } else {
        deliveryCostElement.style.display = 'none';
    }

    // Recalculate total with delivery cost
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + additionalCost;
    document.getElementById('cartTotal').textContent = `Total: R ${total.toFixed(2)}`;

    updatePlaceOrderButton();
}

// Update Payment Method details when selected
function updatePaymentDetails() {
    const paymentMethod = document.getElementById('paymentMethod').value; // Get selected payment method from dropdown

    // Show details based on selected payment method
    if (paymentMethod === 'directTransfer') {
        document.getElementById('bankDetails').style.display = 'block';
        document.getElementById('paypalDetails').style.display = 'none';
    } else if (paymentMethod === 'paypal') {
        document.getElementById('paypalDetails').style.display = 'block';
        document.getElementById('bankDetails').style.display = 'none';
    }
}

// Enable or disable the Place Order button based on form input validity
function updatePlaceOrderButton() {
    // Get the values of the input fields and dropdowns
    const billingName = document.getElementById('billingName').value.trim();
    const billingEmail = document.getElementById('billingEmail').value.trim();
    const billingAddress = document.getElementById('billingAddress').value.trim();
    const billingPhone = document.getElementById('billingPhone').value.trim();
    const paymentMethod = document.getElementById('paymentMethod').value;
    const deliveryOption = document.getElementById('deliveryOption').value;

    // Check if all fields are filled and if a payment method and delivery option are selected
    const isFormValid = billingName && billingEmail && billingAddress && billingPhone && paymentMethod && deliveryOption;

    // Enable or disable the Place Order button based on the form validity
    document.getElementById('placeOrderBtn').disabled = !isFormValid;
}


// Handle the "Place Order" action
function placeOrder() {
    const cart = getCart();
    const billingName = document.getElementById('billingName').value;
    const billingEmail = document.getElementById('billingEmail').value;
    const billingAddress = document.getElementById('billingAddress').value;
    const billingPhone = document.getElementById('billingPhone').value;
    const paymentMethod = document.getElementById('paymentMethod').value; // Get selected payment method
    const deliveryOption = document.getElementById('deliveryOption').value; // Get selected delivery option

    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }

    let message = `Hello! I would like to place an order for the following items:\n\n`;
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${item.name} - R ${item.price} x ${item.quantity} = R ${itemTotal.toFixed(2)}\n`;
    });

    const additionalCost = deliveryOption === 'delivery' ? 50 : 0;
    message += `\nDelivery: ${deliveryOption} (R ${additionalCost.toFixed(2)})\n`;
    message += `\nTotal: R ${(total + additionalCost).toFixed(2)}\n`;
    message += `\nBilling Info:\nName: ${billingName}\nEmail: ${billingEmail}\nAddress: ${billingAddress}\nPhone: ${billingPhone}\n`;
    message += `Payment Method: ${paymentMethod}\n`;

    // Encode the message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/27726962588?text=${encodedMessage}`;

    // Open WhatsApp link in a new tab
    window.open(whatsappLink, '_blank');

    // Clear the cart after placing the order
    localStorage.removeItem('cart');
    alert("Your order has been placed!");
}

// Close cart modal
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

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

