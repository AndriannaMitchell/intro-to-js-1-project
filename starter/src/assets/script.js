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
      price: 4.00,
      quantity: 0,
      productId: 3,
      image: './images/strawberry.jpg',
  },
];

// Declare an empty array for the cart
const cart = [];

// Function to add a product to the cart
function addProductToCart(productId) {
  const product = products.find(item => item.productId === productId);
  if (product) {
      product.quantity += 1; // Increase product quantity
      const cartProduct = cart.find(item => item.productId === productId);
      if (!cartProduct) {
          cart.push({...product}); // Push a copy of the product to the cart
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
      cart[productIndex].quantity = 0; // Set quantity to 0
      cart.splice(productIndex, 1); // Remove product from cart
  }
}

// Function to calculate the total cost of products in the cart
function cartTotal() {
  return cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
  }, 0).toFixed(2); // Return total cost rounded to 2 decimal places
}

// Function to empty the cart
function emptyCart() {
  cart.length = 0; // Clear the cart array
  products.forEach(product => product.quantity = 0); // Reset product quantities
}

// Function to process payment
function pay(amount) {
  const totalCost = parseFloat(cartTotal());
  const cashReturn = amount - totalCost;
  return parseFloat(cashReturn.toFixed(2)); // Return rounded cash return
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
