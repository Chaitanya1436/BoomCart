// orders.js - Store for order details

// Sample initial order for demonstration
const initialOrders = [
    {
      id: "BOC12345",
      customerId: 1,
      customerName: "Demo User",
      customerMobile: "9876543210",
      customerAddress: "123 Main St, Bangalore, Karnataka",
      date: new Date().toISOString(),
      totalAmount: 249900, // in paise (₹2499.00)
      transactionId: "UPI123456789",
      status: "pending",
      items: [
        {
          id: 1,
          productId: 3,
          name: "Classic White T-Shirt",
          price: 59900, // in paise (₹599.00)
          quantity: 2
        },
        {
          id: 2,
          productId: 21,
          name: "Lipstick Set",
          price: 79900, // in paise (₹799.00)
          quantity: 1
        },
        {
          id: 3,
          productId: 30,
          name: "Coffee Maker",
          price: 159900, // in paise (₹1599.00)
          quantity: 1
        }
      ]
    }
  ];
  
  // Get all orders
  function getAllOrders() {
    return JSON.parse(localStorage.getItem('boomcart_orders')) || [];
  }
  
  // Save all orders
  function saveAllOrders(ordersArray) {
    localStorage.setItem('boomcart_orders', JSON.stringify(ordersArray));
  }
  
  // Generate a unique order ID
  function generateOrderId() {
    const prefix = "BOC";
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}${randomNum}`;
  }
  
  // Add a new order
  function addOrder(orderData) {
    const allOrders = getAllOrders();
    
    // Generate a unique ID
    const orderId = generateOrderId();
    
    // Create new order object
    const newOrder = {
      id: orderId,
      ...orderData,
      date: new Date().toISOString(),
      status: "pending"
    };
    
    // Add to orders array
    allOrders.push(newOrder);
    
    // Save updated array
    saveAllOrders(allOrders);
    
    return { success: true, message: "Order placed successfully", orderId };
  }
  
  // Get order by ID
  function getOrderById(orderId) {
    const allOrders = getAllOrders();
    return allOrders.find(order => order.id === orderId);
  }
  
  // Update order status
  function updateOrderStatus(orderId, newStatus) {
    const allOrders = getAllOrders();
    const orderIndex = allOrders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) {
      return { success: false, message: "Order not found" };
    }
    
    // Update status
    allOrders[orderIndex].status = newStatus;
    
    // Save updated array
    saveAllOrders(allOrders);
    
    return { success: true, message: `Order ${newStatus} successfully` };
  }
  
  // Get orders by status
  function getOrdersByStatus(status) {
    const allOrders = getAllOrders();
    
    if (status === 'all') {
      return allOrders;
    }
    
    return allOrders.filter(order => order.status === status);
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
  
  // Initialize orders in localStorage if not already present
  function initializeOrders() {
    if (!localStorage.getItem('boomcart_orders')) {
      saveAllOrders(initialOrders);
    }
  }
  
  // Initialize on load
  initializeOrders();
  
  // Make functions available globally
  window.orderService = {
    getAllOrders,
    addOrder,
    getOrderById,
    updateOrderStatus,
    getOrdersByStatus,
    formatPrice
  };
  