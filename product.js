// product.js - Product detail page functionality

// Get product ID from URL query parameter
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Format price from paise to rupees with commas
function formatPrice(priceInPaise) {
    const priceInRupees = priceInPaise / 100;
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(priceInRupees);
}

// Load product details
function loadProductDetails() {
    const productId = getProductIdFromUrl();
    
    // Find product in the global products array (from data.js)
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        // Product not found, show error
        document.getElementById('product-detail-container').innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <h2>Product Not Found</h2>
                <p>The product you're looking for doesn't exist or has been removed.</p>
                <a href="index.html" class="btn btn-primary">Back to Home</a>
            </div>
        `;
        return;
    }
    
    // Update page title
    document.title = `${product.name} - BoomCart`;
    
    // Update breadcrumb
    document.getElementById('product-breadcrumb').textContent = product.name;
    const categoryLink = document.getElementById('category-link');
    categoryLink.textContent = getCategoryName(product.category);
    categoryLink.href = `category.html?category=${product.category}`;
    
    // Render product details
    const productDetailContainer = document.getElementById('product-detail-container');
    
    productDetailContainer.innerHTML = `
        <div class="product-detail-left">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
        </div>
        <div class="product-detail-right">
            <h1 class="product-detail-name">${product.name}</h1>
            <div class="product-detail-price">
                <span class="current-price">${formatPrice(product.price)}</span>
                ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                ${product.originalPrice ? `<span class="discount-badge">${Math.round((1 - product.price/product.originalPrice) * 100)}% OFF</span>` : ''}
            </div>
            <div class="product-detail-description">
                <p>${product.description}</p>
            </div>
            <div class="product-detail-actions">
                <div class="quantity-selector">
                    <button class="quantity-btn" id="decrease-quantity">-</button>
                    <input type="number" id="product-quantity" value="1" min="1" max="10">
                    <button class="quantity-btn" id="increase-quantity">+</button>
                </div>
                <button class="btn btn-primary add-to-cart-btn" id="add-to-cart-btn">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
            <div class="product-detail-meta">
                <div class="meta-item">
                    <span class="meta-label">Category:</span>
                    <span class="meta-value">${getCategoryName(product.category)}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Product ID:</span>
                    <span class="meta-value">${product.id}</span>
                </div>
            </div>
            <div class="product-detail-features">
                <h3>Features</h3>
                <ul>
                    <li><i class="fas fa-check"></i> Premium quality</li>
                    <li><i class="fas fa-check"></i> Easy returns</li>
                    <li><i class="fas fa-check"></i> Fast delivery</li>
                    <li><i class="fas fa-check"></i> 100% authentic product</li>
                </ul>
            </div>
        </div>
    `;
    
    // Load related products
    loadRelatedProducts(product.category, product.id);
    
    // Setup quantity selector
    setupQuantitySelector();
    
    // Setup add to cart button
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('product-quantity').value);
        addToCartWithQuantity(product, quantity);
    });
}

// Helper function to get category name
function getCategoryName(categorySlug) {
    const categoryNames = {
        'men': 'Men\'s Fashion',
        'women': 'Women\'s Fashion',
        'kids': 'Kids\' Fashion',
        'beauty': 'Beauty Products',
        'kitchen': 'Kitchen Items',
        'toys': 'Toys'
    };
    
    return categoryNames[categorySlug] || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
}

// Load related products
function loadRelatedProducts(category, currentProductId) {
    // Get products in the same category
    const relatedProducts = products
        .filter(p => p.category === category && p.id !== currentProductId)
        .slice(0, 4); // Limit to 4 related products
    
    const relatedProductsContainer = document.getElementById('related-products');
    
    if (relatedProducts.length === 0) {
        relatedProductsContainer.innerHTML = '<p>No related products found.</p>';
        return;
    }
    
    relatedProductsContainer.innerHTML = relatedProducts.map(product => `
        <div class="product-card">
            <a href="product.html?id=${product.id}" class="product-link">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-details">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    <p class="product-description">${product.description}</p>
                </div>
            </a>
            <button class="btn btn-primary add-to-cart" onclick="addToCartFromRelated(event, ${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Setup quantity selector
function setupQuantitySelector() {
    const quantityInput = document.getElementById('product-quantity');
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    
    decreaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });
    
    // Ensure the input stays within range on manual entry
    quantityInput.addEventListener('change', () => {
        let value = parseInt(quantityInput.value);
        if (isNaN(value) || value < 1) {
            quantityInput.value = 1;
        } else if (value > 10) {
            quantityInput.value = 10;
        }
    });
}

// Add to cart with specified quantity
function addToCartWithQuantity(product, quantity) {
    // Clone the product and add quantity
    const productToAdd = { ...product };
    
    for (let i = 0; i < quantity; i++) {
        window.addToCart(productToAdd);
    }
    
    // Show success message
    showToast(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart`);
}

// Add to cart from related products section
function addToCartFromRelated(event, productId) {
    event.preventDefault();
    event.stopPropagation();
    
    const product = products.find(p => p.id === productId);
    if (product) {
        window.addToCart(product);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in (from scripts.js)
    if (typeof checkUserLogin === 'function') {
        checkUserLogin();
    }
    
    // Initialize login modal tabs (if not already done in scripts.js)
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    
    if (loginTab && registerTab) {
        loginTab.addEventListener('click', function() {
            this.classList.add('active');
            registerTab.classList.remove('active');
            document.getElementById('login-panel').classList.remove('hidden');
            document.getElementById('register-panel').classList.add('hidden');
        });
        
        registerTab.addEventListener('click', function() {
            this.classList.add('active');
            loginTab.classList.remove('active');
            document.getElementById('register-panel').classList.remove('hidden');
            document.getElementById('login-panel').classList.add('hidden');
        });
    }
    
    // Setup login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Setup register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Setup cart
    if (typeof initCart === 'function') {
        initCart();
    }
    
    // Setup close modal buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        const modalId = button.closest('.modal').id;
        button.addEventListener('click', () => closeModal(modalId));
    });
    
    // Setup mobile menu
    if (typeof setupMobileMenu === 'function') {
        setupMobileMenu();
    }
    
    // Load product details
    loadProductDetails();
});