// Define an array of products
const products = [
  {
      name: 'Cherry',
      price: 5.99,
      quantity: 0,
      productId: 1,
      image: './images/cherry.jpg',
  },
  {
      name: 'Orange',
      price: 3.50,
      quantity: 0,
      productId: 2,
      image: './images/orange.jpg',
  },
  {
      name: 'Strawberry',
      price: 4.23,
      quantity: 0,
      productId: 3,
      image: './images/strawberry.jpg',
  },
];

// Declare an empty array for the cart
const cart = [];

// Helper function to get product by ID
function getProductById(productId, list) {
  return list.find(item => item.productId === productId);
}

// Refactored addProductToCart using helper function
function addProductToCart(productId) {
  const product = getProductById(productId, products);
  if (product) {
    product.quantity += 1; // Increase product quantity
    const cartProduct = getProductById(productId, cart);
    if (!cartProduct) {
      cart.push(product); // Push the product reference into the cart
    }
  }
}



// Function to increase product quantity in the cart
function increaseQuantity(productId) {
  const cartProduct = cart.find(item => item.productId === productId);
  if (cartProduct) {
      cartProduct.quantity += 1; // Increase quantity in the cart
  }
}

// Function to decrease product quantity in the cart
function decreaseQuantity(productId) {
  const cartProduct = cart.find(item => item.productId === productId);
  if (cartProduct) {
      cartProduct.quantity -= 1; // Decrease quantity
      if (cartProduct.quantity <= 0) {
          removeProductFromCart(productId); // Remove if quantity is 0
      }
  }
}

// Function to remove product from the cart
function removeProductFromCart(productId) {
  const productIndex = cart.findIndex(item => item.productId === productId);
  if (productIndex > -1) {
      cart[productIndex].quantity = 0; 
      cart.splice(productIndex, 1); // Remove product from cart
  }
}

// Function to calculate the total cost of products in the cart
function cartTotal() {
  return Math.round(cart.reduce((total, item) => {
    return total + (item.price * item.quantity) * 100; 
  }, 0)) / 100; 
}

// Function to empty the cart
function emptyCart() {
  cart.length = 0; // Clear the cart array
  products.forEach(product => product.quantity = 0); // Reset product quantities
}

let totalPaid = 0; // Variable to track total amount paid

// Function to process payment
function pay(amount) {
  const totalCost = cartTotal(); // Get the total cost of the cart
  totalPaid += amount; // Update total paid with the new amount
  
  let remaining = totalPaid - totalCost; // Calculate remaining balance

  if (remaining >= 0) {
    // If payment is sufficient, empty the cart and reset totalPaid
    emptyCart();
    totalPaid = 0; // Reset total paid after successful payment
    return remaining; // Return change (if any)
  } else {
    // If not enough, return the negative remaining balance
    return remaining; // Indicate how much more is needed
  }
}

// Helper function to empty the cart after successful payment
function emptyCart() {
  cart.length = 0; // Clear the cart by setting its length to 0
}

// Export necessary functions and data for use in front.js
module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay, 
  emptyCart,
};
