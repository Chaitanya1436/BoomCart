// scripts.js - Main functionality for BoomCart website

// DOM Elements
let cartItems = [];
let currentUser = null;

// Check if user is logged in
function checkUserLogin() {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  if (loggedInUser) {
    currentUser = JSON.parse(loggedInUser);
    updateUI();
  }
}

// Update UI based on login status
function updateUI() {
  const loginBtn = document.getElementById('login-btn');
  const headerActions = document.querySelector('.header-actions');
  
  if (currentUser) {
    // User is logged in
    if (loginBtn) {
      loginBtn.textContent = 'Logout';
      loginBtn.removeEventListener('click', showLoginModal);
      loginBtn.addEventListener('click', handleLogout);
    }
    
    // Add user info if not already there
    if (!document.querySelector('.user-info') && headerActions) {
      const userInfoDiv = document.createElement('div');
      userInfoDiv.className = 'user-info';
      userInfoDiv.innerHTML = `<span>${currentUser.username}</span>`;
      
      // Insert before cart icon
      const cartIcon = document.querySelector('.cart-icon');
      if (cartIcon) {
        headerActions.insertBefore(userInfoDiv, cartIcon);
      } else {
        headerActions.appendChild(userInfoDiv);
      }
    }
    
    // If user is admin, add admin link
    if (currentUser.isAdmin) {
      const nav = document.querySelector('nav ul');
      if (nav && !document.querySelector('a[href="admin.html"]')) {
        const adminLi = document.createElement('li');
        adminLi.innerHTML = '<a href="admin.html">Admin</a>';
        nav.appendChild(adminLi);
      }
    }
  } else {
    // User is not logged in
    if (loginBtn) {
      loginBtn.textContent = 'Login';
      loginBtn.removeEventListener('click', handleLogout);
      loginBtn.addEventListener('click', showLoginModal);
    }
    
    // Remove user info if exists
    const userInfo = document.querySelector('.user-info');
    if (userInfo) {
      userInfo.remove();
    }
  }
}

// Handle logout
function handleLogout() {
  sessionStorage.removeItem('loggedInUser');
  sessionStorage.removeItem('adminLoggedIn');
  currentUser = null;
  updateUI();
  location.reload();
}

// Show login modal
function showLoginModal() {
  const loginModal = document.getElementById('login-modal');
  const overlay = document.getElementById('overlay');
  
  if (loginModal && overlay) {
    loginModal.style.display = 'block';
    overlay.style.display = 'block';
  }
}

// Close modal function
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  const overlay = document.getElementById('overlay');
  
  if (modal && overlay) {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  }
}

// Handle login form submission
function handleLogin(event) {
  event.preventDefault();
  
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  
  // Verify credentials using users.js
  const result = window.userService.verifyCredentials(username, password);
  
  const loginMessage = document.getElementById('login-message');
  loginMessage.style.display = 'block';
  
  if (result.success) {
    loginMessage.textContent = result.message;
    loginMessage.className = 'mt-3 text-center text-success';
    
    // Store user in session
    sessionStorage.setItem('loggedInUser', JSON.stringify(result.user));
    currentUser = result.user;
    
    // If admin, set admin flag
    if (result.user.isAdmin) {
      sessionStorage.setItem('adminLoggedIn', 'true');
    }
    
    // Close modal after delay
    setTimeout(() => {
      closeModal('login-modal');
      updateUI();
      
      // Redirect to admin page if admin
      if (result.user.isAdmin) {
        window.location.href = 'admin.html';
      }
    }, 1000);
  } else {
    loginMessage.textContent = result.message;
    loginMessage.className = 'mt-3 text-center text-error';
  }
}

// Handle registration form submission
function handleRegister(event) {
  event.preventDefault();
  
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  
  // Basic validation
  if (!username || !email || !password) {
    const registerMessage = document.getElementById('register-message');
    registerMessage.textContent = 'Please fill all fields';
    registerMessage.className = 'mt-3 text-center text-error';
    registerMessage.style.display = 'block';
    return;
  }
  
  // Add user using users.js
  const result = window.userService.addUser(username, password, email);
  
  const registerMessage = document.getElementById('register-message');
  registerMessage.style.display = 'block';
  
  if (result.success) {
    registerMessage.textContent = result.message;
    registerMessage.className = 'mt-3 text-center text-success';
    
    // Reset form
    document.getElementById('register-form').reset();
    
    // Switch to login tab after delay
    setTimeout(() => {
      document.getElementById('login-tab').click();
    }, 1500);
  } else {
    registerMessage.textContent = result.message;
    registerMessage.className = 'mt-3 text-center text-error';
  }
}

// Cart Functions
function initCart() {
  // Load cart from localStorage
  cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartCount();
  
  // Setup cart icon click handler
  const cartIcon = document.getElementById('cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', toggleCart);
  }
  
  // Setup close cart button
  const closeCartBtn = document.querySelector('.close-cart');
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', toggleCart);
  }
  
  // Setup checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', showCheckoutModal);
  }
  
  // Setup clear cart button
  const clearCartBtn = document.getElementById('clear-cart-btn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }
}

// Toggle cart sidebar
function toggleCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('overlay');
  
  if (cartSidebar && overlay) {
    if (cartSidebar.style.right === '0px') {
      cartSidebar.style.right = '-400px';
      overlay.style.display = 'none';
    } else {
      renderCartItems();
      cartSidebar.style.right = '0px';
      overlay.style.display = 'block';
    }
  }
}

// Add item to cart
function addToCart(product) {
  const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
  
  if (existingItemIndex !== -1) {
    // If item already in cart, increase quantity
    cartItems[existingItemIndex].quantity += 1;
  } else {
    // Add new item to cart
    cartItems.push({
      ...product,
      quantity: 1
    });
  }
  
  // Save cart to localStorage
  saveCart();
  updateCartCount();
  
  // Show confirmation message
  showToast(`${product.name} added to cart`);
}

// Remove item from cart
function removeFromCart(productId) {
  cartItems = cartItems.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  renderCartItems();
}

// Update cart item quantity
function updateCartItemQuantity(productId, newQuantity) {
  const itemIndex = cartItems.findIndex(item => item.id === productId);
  
  if (itemIndex !== -1) {
    if (newQuantity <= 0) {
      // Remove item if quantity is 0 or less
      removeFromCart(productId);
    } else {
      // Update quantity
      cartItems[itemIndex].quantity = newQuantity;
      saveCart();
      renderCartItems();
    }
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Clear cart
function clearCart() {
  cartItems = [];
  saveCart();
  updateCartCount();
  renderCartItems();
  toggleCart();
}

// Update cart count badge
function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  
  if (cartCount) {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

// Calculate cart total
function calculateCartTotal() {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
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

// Render cart items
function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  if (cartItemsContainer && cartTotal) {
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
    } else {
      cartItemsContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <div class="cart-item-price">${formatPrice(item.price)}</div>
            <div class="cart-item-actions">
              <div class="cart-quantity">
                <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
              </div>
              <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }
    
    // Update cart total
    cartTotal.textContent = formatPrice(calculateCartTotal());
  }
}

// Show checkout modal
function showCheckoutModal() {
  if (cartItems.length === 0) {
    showToast('Your cart is empty');
    return;
  }
  
  const checkoutModal = document.getElementById('checkout-modal');
  const overlay = document.getElementById('overlay');
  
  // Fill in checkout items
  const checkoutItems = document.getElementById('checkout-items');
  if (checkoutItems) {
    checkoutItems.innerHTML = cartItems.map(item => `
      <div class="checkout-item">
        <div class="checkout-item-name">
          <span>${item.name}</span>
          <span>x${item.quantity}</span>
        </div>
        <div class="checkout-item-price">${formatPrice(item.price * item.quantity)}</div>
      </div>
    `).join('');
  }
  
  // Update totals
  const subtotal = calculateCartTotal();
  const shipping = subtotal > 0 ? 9900 : 0; // ₹99 shipping if cart not empty
  const total = subtotal + shipping;
  
  document.getElementById('checkout-subtotal').textContent = formatPrice(subtotal);
  document.getElementById('checkout-shipping').textContent = formatPrice(shipping);
  document.getElementById('checkout-total').textContent = formatPrice(total);
  
  // Show modal
  if (checkoutModal && overlay) {
    checkoutModal.style.display = 'block';
    overlay.style.display = 'block';
  }
  
  // Setup checkout form
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckout);
  }
}

// Handle checkout form submission
function handleCheckout(event) {
  event.preventDefault();
  
  // Get form data
  const fullname = document.getElementById('fullname').value;
  const mobile = document.getElementById('mobile').value;
  const address = document.getElementById('address').value;
  
  // Basic validation
  if (!fullname || !mobile || !address) {
    showToast('Please fill all required fields');
    return;
  }
  
  if (!/^\d{10}$/.test(mobile)) {
    showToast('Please enter a valid 10-digit mobile number');
    return;
  }
  
  // Create order data
  const subtotal = calculateCartTotal();
  const shipping = 9900; // ₹99 shipping
  const total = subtotal + shipping;
  
  const orderData = {
    customerId: currentUser ? currentUser.id : 0,
    customerName: fullname,
    customerMobile: mobile,
    customerAddress: address,
    totalAmount: total,
    transactionId: `UPI${Date.now()}`, // Mock transaction ID
    items: cartItems.map(item => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }))
  };
  
  // Process order using orders.js
  const result = window.orderService.addOrder(orderData);
  
  if (result.success) {
    // Clear cart
    clearCart();
    
    // Close modal
    closeModal('checkout-modal');
    
    // Show success message
    showToast(result.message);
    
    // Show order confirmation
    alert(`Order Placed Successfully!\nOrder ID: ${result.orderId}\nThank you for shopping with BoomCart!`);
  } else {
    showToast('Error placing order. Please try again.');
  }
}

// Show toast message
function showToast(message) {
  // Check if toast container exists, if not, create it
  let toastContainer = document.getElementById('toast-container');
  
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  
  // Create new toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  
  // Add to container
  toastContainer.appendChild(toast);
  
  // Show the toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    
    // Remove from DOM after animation
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Setup mobile menu
function setupMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
}

// Setup carousel
function setupCarousel() {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  
  if (slides.length === 0) return;
  
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Calculate the correct index
    currentSlide = (index + slides.length) % slides.length;
    
    // Show the current slide
    slides[currentSlide].classList.add('active');
  }
  
  // Setup next/prev buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
    });
  }
  
  // Auto-advance carousel
  setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
}

// Function to render products in product grid
function renderProducts(containerId, productsList, limit = 4) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const productsToShow = productsList.slice(0, limit);
  
  container.innerHTML = productsToShow.map(product => `
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
      <button class="btn btn-primary add-to-cart" onclick="addToCartFromProductCard(event, ${product.id})">
        Add to Cart
      </button>
    </div>
  `).join('');
}

// Function to handle add to cart from product cards
function addToCartFromProductCard(event, productId) {
  event.preventDefault();
  event.stopPropagation();
  
  const product = products.find(p => p.id === productId);
  if (product) {
    addToCart(product);
  }
}

// Function to render category products
function renderCategoryProducts() {
  // Get category from URL
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  
  if (!category) {
    window.location.href = 'index.html';
    return;
  }
  
  // Update page title and breadcrumb
  const categoryTitle = document.getElementById('category-title');
  const categoryBreadcrumb = document.getElementById('category-breadcrumb');
  
  if (categoryTitle && categoryBreadcrumb) {
    const categoryName = getCategoryName(category);
    document.title = `${categoryName} - BoomCart`;
    categoryTitle.textContent = categoryName;
    categoryBreadcrumb.textContent = categoryName;
  }
  
  // Get products for this category
  const categoryProducts = products.filter(p => p.category === category);
  
  // Render products
  renderProducts('category-products', categoryProducts, 100); // No limit on category page
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  checkUserLogin();
  
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
  
  // Setup login/register tabs
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
  
  // Setup mobile menu
  setupMobileMenu();
  
  // Initialize cart
  initCart();
  
  // Setup pages based on URL
  const path = window.location.pathname;
  
  // Home page
  if (path.includes('index.html') || path.endsWith('/')) {
    // Render products by category (on homepage)
    const menProducts = products.filter(p => p.category === 'men');
    const womenProducts = products.filter(p => p.category === 'women');
    const kidsProducts = products.filter(p => p.category === 'kids');
    const beautyProducts = products.filter(p => p.category === 'beauty');
    const kitchenProducts = products.filter(p => p.category === 'kitchen');
    const toysProducts = products.filter(p => p.category === 'toys');
    
    renderProducts('men-products', menProducts);
    renderProducts('women-products', womenProducts);
    renderProducts('kids-products', kidsProducts);
    renderProducts('beauty-products', beautyProducts);
    renderProducts('kitchen-products', kitchenProducts);
    renderProducts('toys-products', toysProducts);
    
    // Setup carousel
    if (document.querySelector('.hero-carousel')) {
      setupCarousel();
    }
  }
  
  // Category page
  if (path.includes('category.html')) {
    renderCategoryProducts();
  }
  
  // Setup close modal buttons
  const closeButtons = document.querySelectorAll('.close-modal');
  closeButtons.forEach(button => {
    const modalId = button.closest('.modal').id;
    button.addEventListener('click', () => closeModal(modalId));
  });
  
  // Setup login button
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn && !currentUser) {
    loginBtn.addEventListener('click', showLoginModal);
  }
  
  // Close modals when clicking on overlay
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.addEventListener('click', function(event) {
      if (event.target === overlay) {
        // Close all modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
          modal.style.display = 'none';
        });
        
        // Close cart if open
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar && cartSidebar.style.right === '0px') {
          cartSidebar.style.right = '-400px';
        }
        
        // Hide overlay
        overlay.style.display = 'none';
      }
    });
  }
});