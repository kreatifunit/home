// Function to change the main product image
function changeImage(imageSrc) {
    document.getElementById('mainImage').src = imageSrc;
}

// Function to handle "Add to Cart" button click
function addToCart() {
    const stockQuantity = parseInt(document.getElementById('stockQuantity').innerText.split(' ')[0]);
    
    if (stockQuantity > 0) {
        alert('Product added to cart!');
        updateStockQuantity(stockQuantity - 1);
    } else {
        alert('Product is out of stock!');
    }
}

// Function to update stock quantity and status
function updateStockQuantity(newQuantity) {
    document.getElementById('stockQuantity').innerText = `${newQuantity} units available`;
    
    if (newQuantity <= 0) {
        document.getElementById('stockStatus').innerText = 'Out of Stock';
        document.getElementById('stockStatus').style.color = 'red';
        document.getElementById('addToCart').disabled = true;
    }
}

