// Plant data
const plants = [
    {
        id: 1,
        name: "Monstera Deliciosa",
        price: 29.99,
        image: "images/plant1.svg",
        category: "indoor"
    },
    {
        id: 2,
        name: "Peace Lily",
        price: 24.99,
        image: "images/plant2.svg",
        category: "indoor"
    },
    {
        id: 3,
        name: "Echeveria",
        price: 14.99,
        image: "images/plant3.svg",
        category: "succulent"
    },
    {
        id: 4,
        name: "Aloe Vera",
        price: 19.99,
        image: "images/plant4.svg",
        category: "succulent"
    },
    {
        id: 5,
        name: "Orchid",
        price: 34.99,
        image: "images/plant5.svg",
        category: "flowering"
    },
    {
        id: 6,
        name: "Anthurium",
        price: 27.99,
        image: "images/plant6.svg",
        category: "flowering"
    }
];

// Cart functionality
let cart = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    loadCart();
    
    // Update cart count
    updateCartCount();
    
    // Initialize page-specific functionality
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'products.html' || currentPage === '') {
        initProductPage();
    } else if (currentPage === 'cart.html') {
        renderCartItems();
        updateCartSummary();
        initCartFunctionality();
    }
});

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count in the header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = itemCount;
    });
}

// Initialize product page functionality
function initProductPage() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        const productCard = button.closest('.product-card');
        const productId = parseInt(productCard.dataset.id);
        
        // Check if product is already in cart
        const isInCart = cart.some(item => item.id === productId);
        if (isInCart) {
            button.disabled = true;
            button.textContent = 'Added to Cart';
        }
        
        // Add click event listener
        button.addEventListener('click', function() {
            addToCart(productId);
            button.disabled = true;
            button.textContent = 'Added to Cart';
        });
    });
}

// Add product to cart
function addToCart(productId) {
    const product = plants.find(plant => plant.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        saveCart();
        updateCartCount();
    }
}

// Render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="products.html" class="btn">Shop Now</a>
            </div>
        `;
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.dataset.id = item.id;
        
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease"><i class="fas fa-minus"></i></button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase"><i class="fas fa-plus"></i></button>
            </div>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
}

// Update cart summary
function updateCartSummary() {
    const totalItemsElement = document.getElementById('total-items');
    const totalCostElement = document.getElementById('total-cost');
    
    if (!totalItemsElement || !totalCostElement) return;
    
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const totalCost = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    totalItemsElement.textContent = itemCount;
    totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
}

// Initialize cart page functionality
function initCartFunctionality() {
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');
    const paymentOptions = document.querySelectorAll('input[name="payment-method"]');
    
    if (!cartItemsContainer) return;
    
    // Event delegation for cart item buttons
    cartItemsContainer.addEventListener('click', function(event) {
        const target = event.target;
        const cartItem = target.closest('.cart-item');
        
        if (!cartItem) return;
        
        const itemId = parseInt(cartItem.dataset.id);
        
        // Increase quantity button
        if (target.closest('.increase')) {
            increaseQuantity(itemId);
        }
        
        // Decrease quantity button
        if (target.closest('.decrease')) {
            decreaseQuantity(itemId);
        }
        
        // Delete button
        if (target.closest('.delete-btn')) {
            removeFromCart(itemId);
        }
    });
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // Check if a payment method is selected
            let selectedPayment = '';
            let isPaymentSelected = false;
            
            paymentOptions.forEach(option => {
                if (option.checked) {
                    selectedPayment = option.value;
                    isPaymentSelected = true;
                }
            });
            
            if (!isPaymentSelected) {
                alert('Please select a payment method');
                return;
            }
            
            // Process checkout based on payment method
            if (selectedPayment.startsWith('upi-')) {
                processUpiPayment(selectedPayment);
            } else {
                processInternationalPayment(selectedPayment);
            }
        });
    }
}

// Process UPI payment
function processUpiPayment(paymentMethod) {
    const upiMethods = {
        'upi-gpay': 'Google Pay UPI',
        'upi-phonepe': 'PhonePe UPI',
        'upi-paytm': 'Paytm UPI',
        'upi-other': 'Other UPI ID'
    };
    
    const selectedUpi = upiMethods[paymentMethod];
    
    if (paymentMethod === 'upi-other') {
        const upiId = prompt('Please enter your UPI ID:');
        if (!upiId) return;
        
        alert(`Payment processing with ${selectedUpi}: ${upiId}\nThis feature is coming soon!`);
    } else {
        alert(`Redirecting to ${selectedUpi} for payment...\nThis feature is coming soon!`);
    }
}

// Process international payment
function processInternationalPayment(paymentMethod) {
    const internationalMethods = {
        'card-visa': 'Visa Card',
        'card-mastercard': 'Mastercard',
        'card-amex': 'American Express',
        'paypal': 'PayPal'
    };
    
    const selectedMethod = internationalMethods[paymentMethod];
    
    alert(`Processing payment with ${selectedMethod}...\nThis feature is coming soon!`);
}

// Increase item quantity
function increaseQuantity(itemId) {
    const item = cart.find(item => item.id === itemId);
    
    if (item) {
        item.quantity += 1;
        saveCart();
        updateCartCount();
        renderCartItems();
        updateCartSummary();
    }
}

// Decrease item quantity
function decreaseQuantity(itemId) {
    const item = cart.find(item => item.id === itemId);
    
    if (item) {
        item.quantity -= 1;
        
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            saveCart();
            updateCartCount();
            renderCartItems();
            updateCartSummary();
        }
    }
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartCount();
    renderCartItems();
    updateCartSummary();
}