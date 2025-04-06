// admin.js - Admin dashboard functionality

// Current order filter
let currentFilter = 'all';

// Check if admin is logged in
function checkAdminLogin() {
  if (!sessionStorage.getItem('adminLoggedIn')) {
    showAdminLoginModal();
    return false;
  }
  return true;
}

// Show admin login modal
function showAdminLoginModal() {
  const adminLoginModal = document.getElementById('admin-login-modal');
  const overlay = document.getElementById('overlay');
  
  if (adminLoginModal && overlay) {
    adminLoginModal.style.display = 'block';
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

// Handle admin login
function handleAdminLogin(event) {
  event.preventDefault();
  
  const username = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;
  
  // Verify credentials using users.js
  const result = window.userService.verifyCredentials(username, password);
  
  if (result.success && result.user.isAdmin) {
    // Set admin session
    sessionStorage.setItem('adminLoggedIn', 'true');
    sessionStorage.setItem('loggedInUser', JSON.stringify(result.user));
    
    // Close modal and load orders
    closeModal('admin-login-modal');
    loadOrders();
    
    // Update UI to show admin name
    const userInfo = document.querySelector('.user-info span');
    if (userInfo) {
      userInfo.textContent = result.user.username;
    }
  } else {
    alert('Invalid admin credentials');
  }
}

// Load orders
function loadOrders() {
  // Get orders based on current filter
  const orders = window.orderService.getOrdersByStatus(currentFilter);
  
  // Update order counts
  updateOrderStats();
  
  // Render orders table
  renderOrdersTable(orders);
}

// Update order statistics
function updateOrderStats() {
  const allOrders = window.orderService.getAllOrders();
  
  const pendingCount = allOrders.filter(order => order.status === 'pending').length;
  const approvedCount = allOrders.filter(order => order.status === 'approved').length;
  const rejectedCount = allOrders.filter(order => order.status === 'rejected').length;
  
  document.getElementById('pending-count').textContent = pendingCount;
  document.getElementById('approved-count').textContent = approvedCount;
  document.getElementById('rejected-count').textContent = rejectedCount;
}

// Render orders table
function renderOrdersTable(orders) {
  const tableBody = document.getElementById('orders-table-body');
  const noOrders = document.getElementById('no-orders');
  
  if (tableBody) {
    if (orders.length === 0) {
      tableBody.innerHTML = '';
      noOrders.classList.remove('hidden');
    } else {
      noOrders.classList.add('hidden');
      
      tableBody.innerHTML = orders.map(order => {
        const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        
        let statusClass = '';
        if (order.status === 'pending') statusClass = 'status-pending';
        if (order.status === 'approved') statusClass = 'status-approved';
        if (order.status === 'rejected') statusClass = 'status-rejected';
        
        let actionButtons = `<button onclick="viewOrderDetails('${order.id}')" class="btn btn-small btn-primary">View</button>`;
        
        if (order.status === 'pending') {
          actionButtons += `
            <button onclick="approveOrder('${order.id}')" class="btn btn-small btn-success">Approve</button>
            <button onclick="rejectOrder('${order.id}')" class="btn btn-small btn-danger">Reject</button>
          `;
        }
        
        return `
          <tr>
            <td>${order.id}</td>
            <td>${order.customerName}</td>
            <td>${formattedDate}</td>
            <td>${window.orderService.formatPrice(order.totalAmount)}</td>
            <td><span class="status ${statusClass}">${order.status}</span></td>
            <td>${actionButtons}</td>
          </tr>
        `;
      }).join('');
    }
  }
}

// View order details
function viewOrderDetails(orderId) {
  const order = window.orderService.getOrderById(orderId);
  
  if (order) {
    alert(`Order Details for ${orderId}:
Customer: ${order.customerName}
Mobile: ${order.customerMobile}
Address: ${order.customerAddress}
Amount: ${window.orderService.formatPrice(order.totalAmount)}
Items: ${order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
Transaction ID: ${order.transactionId}
Status: ${order.status}
    `);
  } else {
    alert('Order not found');
  }
}

// Approve order
function approveOrder(orderId) {
  if (confirm(`Are you sure you want to approve order ${orderId}?`)) {
    const result = window.orderService.updateOrderStatus(orderId, 'approved');
    
    if (result.success) {
      alert(result.message);
      loadOrders();
    } else {
      alert(result.message);
    }
  }
}

// Reject order
function rejectOrder(orderId) {
  if (confirm(`Are you sure you want to reject order ${orderId}?`)) {
    const result = window.orderService.updateOrderStatus(orderId, 'rejected');
    
    if (result.success) {
      alert(result.message);
      loadOrders();
    } else {
      alert(result.message);
    }
  }
}

// Setup order tabs
function setupOrderTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active tab
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update filter and reload orders
      currentFilter = btn.getAttribute('data-filter');
      loadOrders();
    });
  });
}

// Setup logout button
function setupLogoutButton() {
  const logoutBtn = document.getElementById('logout-btn');
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('adminLoggedIn');
      sessionStorage.removeItem('loggedInUser');
      window.location.href = 'index.html';
    });
  }
}
// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Setup admin login form
  const adminLoginForm = document.getElementById('admin-login-form');
  
  if (adminLoginForm) {
      adminLoginForm.addEventListener('submit', handleAdminLogin);
  }
  
  // Setup order tabs
  setupOrderTabs();
  
  // Setup logout button
  setupLogoutButton();
  
  // Setup close modal buttons
  const closeButtons = document.querySelectorAll('.close-modal');
  
  closeButtons.forEach(button => {
      const modalId = button.closest('.modal').id;
      button.addEventListener('click', () => closeModal(modalId));
  });
  
  // Call mobile menu setup
  setupMobileMenu();
  
  // Check if admin is logged in and load orders
  if (checkAdminLogin()) {
      loadOrders();
  }
});


