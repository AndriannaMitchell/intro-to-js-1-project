// Create an array named products
const products = [
  {
    name: 'Cherry',
    price: 5.99,
    quantity: 0, // quantity in cart
    productId: 1,
    image: './images/cherry.jpg'
  },
  {
    name: 'Orange',
    price: 3.50,
    quantity: 0,
    productId: 2,
    image: './images/orange.jpg'
  },
  {
    name: 'Strawberry',
    price: 4.00,
    quantity: 0,
    productId: 3,
    image: './images/strawberry.jpg'
  }
];

// Declare an empty array named cart
const cart = [];

/* Function to add product to the cart based on productId */
function addProductToCart(productId) {
  const product = products.find(item => item.productId === productId);
  if (product) {
    product.quantity += 1; // increase quantity
    if (!cart.includes(product)) {
      cart.push(product); // add to cart if not already in it
    }
  }
}

/* Function to decrease product quantity in the cart */
function decreaseQuantity(productId) {
  const product = cart.find(item => item.productId === productId);
  if (product) {
    product.quantity -= 1;
    if (product.quantity === 0) {
      removeProductFromCart(productId); // remove if quantity reaches 0
    }
  }
}



/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/

/* Create a function called emptyCart that empties the products from the cart */

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/


/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

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
   /* Uncomment the following line if completing the currency converter bonus */
   // currency
}
