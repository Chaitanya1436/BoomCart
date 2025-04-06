// users.js - Store for user credentials
const users = [
    {
      id: 1,
      username: "user",
      password: "password123",
      email: "user@example.com",
      isAdmin: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 999,
      username: "admin",
      password: "admin123",
      email: "admin@boomcart.com",
      isAdmin: true,
      createdAt: new Date().toISOString()
    }
  ];
  
  // Get all users
  function getAllUsers() {
    // In a real application, this would fetch from localStorage or a server
    return JSON.parse(localStorage.getItem('boomcart_users')) || users;
  }
  
  // Save all users
  function saveAllUsers(usersArray) {
    localStorage.setItem('boomcart_users', JSON.stringify(usersArray));
  }
  
  // Find user by username
  function findUserByUsername(username) {
    const allUsers = getAllUsers();
    return allUsers.find(user => user.username === username);
  }
  
  // Add a new user
  function addUser(username, password, email) {
    const allUsers = getAllUsers();
    
    // Check if username already exists
    if (findUserByUsername(username)) {
      return { success: false, message: "Username already taken" };
    }
    
    // Create new user
    const newUser = {
      id: allUsers.length > 0 ? Math.max(...allUsers.map(u => u.id)) + 1 : 1,
      username,
      password,
      email,
      isAdmin: false,
      createdAt: new Date().toISOString()
    };
    
    // Add to users array
    allUsers.push(newUser);
    
    // Save updated array
    saveAllUsers(allUsers);
    
    return { success: true, message: "Registration successful" };
  }
  
  // Verify login credentials
  function verifyCredentials(username, password) {
    const user = findUserByUsername(username);
    
    if (!user) {
      return { success: false, message: "User not found" };
    }
    
    if (user.password !== password) {
      return { success: false, message: "Invalid password" };
    }
    
    // Return user data without password for security
    const { password: _, ...userData } = user;
    return { success: true, message: "Login successful", user: userData };
  }
  
  // Initialize users in localStorage if not already present
  function initializeUsers() {
    if (!localStorage.getItem('boomcart_users')) {
      saveAllUsers(users);
    }
  }
  
  // Initialize on load
  initializeUsers();
  
  // Make functions available globally
  window.userService = {
    getAllUsers,
    findUserByUsername,
    addUser,
    verifyCredentials
  };
  