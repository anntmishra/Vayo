// User type definition
export interface User {
  email: string;
  password: string;
  name?: string;
}

// Store user in localStorage
export const registerUser = (user: User): void => {
  // Get existing users or initialize empty array
  const existingUsers = JSON.parse(localStorage.getItem('vayo_users') || '[]');
  
  // Check if user already exists
  const userExists = existingUsers.some((u: User) => u.email === user.email);
  
  if (userExists) {
    throw new Error('User with this email already exists');
  }
  
  // Add new user
  existingUsers.push(user);
  
  // Save back to localStorage
  localStorage.setItem('vayo_users', JSON.stringify(existingUsers));
  
  // Set current user
  localStorage.setItem('vayo_current_user', JSON.stringify(user));
};

// Login user
export const loginUser = (email: string, password: string): User => {
  // Get existing users
  const users = JSON.parse(localStorage.getItem('vayo_users') || '[]');
  
  // Find user
  const user = users.find((u: User) => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Set current user
  localStorage.setItem('vayo_current_user', JSON.stringify(user));
  
  return user;
};

// Get current logged in user
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('vayo_current_user');
  if (!userJson) return null;
  
  return JSON.parse(userJson);
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem('vayo_current_user');
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return !!getCurrentUser();
}; 