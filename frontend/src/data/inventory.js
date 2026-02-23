export const inventory = [
  // Starters
  { id: 1, name: 'Paneer Tikka', category: 'Starters', quantity: 45, unit: 'plates', reorderLevel: 20, price: 180, status: 'In Stock' },
  { id: 2, name: 'Veg Spring Roll', category: 'Starters', quantity: 30, unit: 'plates', reorderLevel: 15, price: 120, status: 'In Stock' },
  { id: 3, name: 'Chicken Wings', category: 'Starters', quantity: 18, unit: 'plates', reorderLevel: 20, price: 220, status: 'Low Stock' },
  { id: 4, name: 'French Fries', category: 'Starters', quantity: 60, unit: 'plates', reorderLevel: 25, price: 90, status: 'In Stock' },
  { id: 5, name: 'Corn Cheese Balls', category: 'Starters', quantity: 25, unit: 'plates', reorderLevel: 15, price: 140, status: 'In Stock' },
  
  // Main Course
  { id: 6, name: 'Paneer Butter Masala', category: 'Main Course', quantity: 35, unit: 'servings', reorderLevel: 20, price: 260, status: 'In Stock' },
  { id: 7, name: 'Dal Makhani', category: 'Main Course', quantity: 50, unit: 'servings', reorderLevel: 25, price: 200, status: 'In Stock' },
  { id: 8, name: 'Chicken Biryani', category: 'Main Course', quantity: 12, unit: 'servings', reorderLevel: 15, price: 280, status: 'Low Stock' },
  { id: 9, name: 'Butter Chicken', category: 'Main Course', quantity: 28, unit: 'servings', reorderLevel: 20, price: 300, status: 'In Stock' },
  { id: 10, name: 'Veg Biryani', category: 'Main Course', quantity: 40, unit: 'servings', reorderLevel: 20, price: 200, status: 'In Stock' },
  { id: 11, name: 'Fish Curry', category: 'Main Course', quantity: 15, unit: 'servings', reorderLevel: 18, price: 320, status: 'Low Stock' },
  
  // Breads
  { id: 12, name: 'Butter Naan', category: 'Breads', quantity: 100, unit: 'pieces', reorderLevel: 50, price: 40, status: 'In Stock' },
  { id: 13, name: 'Garlic Naan', category: 'Breads', quantity: 80, unit: 'pieces', reorderLevel: 40, price: 50, status: 'In Stock' },
  { id: 14, name: 'Tandoori Roti', category: 'Breads', quantity: 120, unit: 'pieces', reorderLevel: 60, price: 25, status: 'In Stock' },
  { id: 15, name: 'Cheese Kulcha', category: 'Breads', quantity: 35, unit: 'pieces', reorderLevel: 25, price: 70, status: 'In Stock' },
  
  // Beverages
  { id: 16, name: 'Masala Chai', category: 'Beverages', quantity: 90, unit: 'cups', reorderLevel: 50, price: 30, status: 'In Stock' },
  { id: 17, name: 'Cold Coffee', category: 'Beverages', quantity: 40, unit: 'glasses', reorderLevel: 30, price: 80, status: 'In Stock' },
  { id: 18, name: 'Mango Lassi', category: 'Beverages', quantity: 22, unit: 'glasses', reorderLevel: 25, price: 90, status: 'Low Stock' },
  { id: 19, name: 'Fresh Lime Soda', category: 'Beverages', quantity: 55, unit: 'glasses', reorderLevel: 30, price: 50, status: 'In Stock' },
  { id: 20, name: 'Mineral Water', category: 'Beverages', quantity: 200, unit: 'bottles', reorderLevel: 100, price: 20, status: 'In Stock' },
  
  // Desserts
  { id: 21, name: 'Gulab Jamun', category: 'Desserts', quantity: 50, unit: 'pieces', reorderLevel: 30, price: 60, status: 'In Stock' },
  { id: 22, name: 'Ice Cream', category: 'Desserts', quantity: 32, unit: 'scoops', reorderLevel: 20, price: 80, status: 'In Stock' },
  { id: 23, name: 'Rasmalai', category: 'Desserts', quantity: 18, unit: 'pieces', reorderLevel: 20, price: 90, status: 'Low Stock' },
  { id: 24, name: 'Chocolate Brownie', category: 'Desserts', quantity: 28, unit: 'pieces', reorderLevel: 20, price: 120, status: 'In Stock' },
];

export const inventoryCategories = ['All', 'Starters', 'Main Course', 'Breads', 'Beverages', 'Desserts'];
