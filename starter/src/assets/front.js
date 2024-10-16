let currencySymbol = '$';
let conversionRates = {
    USD: 1,
    EUR: 0.85, // Example conversion rate
    YEN: 110 // Example conversion rate
};
let currentCurrency = 'USD';

// Draws product list
function drawProducts() {
    let productList = document.querySelector('.products');
    let productItems = '';
    products.forEach((element) => {
        let priceInCurrentCurrency = (element.price * conversionRates[currentCurrency]).toFixed(2);
        productItems += `
            <div data-productId='${element.productId}'>
                <img src='${element.image}'>
                <h3>${element.name}</h3>
                <p>price: ${currencySymbol}${priceInCurrentCurrency}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
    });
    productList.innerHTML = productItems;
}

// Draws cart
function drawCart() {
    let cartList = document.querySelector('.cart');
    let cartItems = '';
    cart.forEach((element) => {
        let priceInCurrentCurrency = (element.price * conversionRates[currentCurrency]).toFixed(2);
        let itemTotal = (priceInCurrentCurrency * element.quantity).toFixed(2);

        cartItems += `
            <div data-productId='${element.productId}'>
                <h3>${element.name}</h3>
                <p>price: ${currencySymbol}${priceInCurrentCurrency}</p>
                <p>quantity: ${element.quantity}</p>
                <p>total: ${currencySymbol}${itemTotal}</p>
                <button class="qup">+</button>
                <button class="qdown">-</button>
                <button class="remove">remove</button>
            </div>
        `;
    });
    cart.length
        ? (cartList.innerHTML = cartItems)
        : (cartList.innerHTML = 'Cart Empty');
}

// Draws checkout
function drawCheckout() {
    let checkout = document.querySelector('.cart-total');
    checkout.innerHTML = '';

    // run cartTotal() from script.js
    let cartSum = cartTotal();

    let div = document.createElement('div');
    div.innerHTML = `<p>Cart Total: ${currencySymbol}${cartSum}</p>`;
    checkout.append(div);
}

// Currency converter logic
function currencyBuilder() {
    let currencyPicker = document.querySelector('.currency-selector');
    let select = document.createElement("select");
    select.classList.add("currency-select");
    select.innerHTML = `<option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="YEN">YEN</option>`;
    currencyPicker.append(select);

    select.addEventListener('change', function handleChange(event) {
        currentCurrency = event.target.value;

        // Update currency symbol based on selection
        switch (currentCurrency) {
            case 'EUR':
                currencySymbol = '€';
                break;
            case 'YEN':
                currencySymbol = '¥';
                break;
            default:
                currencySymbol = '$';
                break;
        }

        // Update displayed prices
        drawProducts();
        drawCart();
        drawCheckout();
    });
}
currencyBuilder();

// Event listeners
document.querySelector('.products').addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        let productId = e.target.parentNode.getAttribute('data-productId');
        productId *= 1;
        addProductToCart(productId);
        drawCart();
        drawCheckout();
    }
});

// Event delegation for cart actions
document.querySelector('.cart').addEventListener('click', (e) => {
    function runCartFunction(fn) {
        let productId = e.target.parentNode.getAttribute('data-productId');
        productId *= 1;
        for (let i = cart.length - 1; i > -1; i--) {
            if (cart[i].productId === productId) {
                fn(productId);
            }
        }
        drawCart();
        drawCheckout();
    }

    if (e.target.classList.contains('remove')) {
        runCartFunction(removeProductFromCart);
    } else if (e.target.classList.contains('qup')) {
        runCartFunction(increaseQuantity);
    } else if (e.target.classList.contains('qdown')) {
        runCartFunction(decreaseQuantity);
    }
});

document.querySelector('.pay').addEventListener('click', (e) => {
    e.preventDefault();

    let amount = document.querySelector('.received').value;
    amount *= 1;

    let cashReturn = pay(amount);

    let paymentSummary = document.querySelector('.pay-summary');
    let div = document.createElement('div');

    if (cashReturn >= 0) {
        div.innerHTML = `
            <p>Cash Received: ${currencySymbol}${amount.toFixed(2)}</p>
            <p>Cash Returned: ${currencySymbol}${cashReturn.toFixed(2)}</p>
            <p>Thank you!</p>
        `;
    } else {
        document.querySelector('.received').value = '';
        div.innerHTML = `
            <p>Cash Received: ${currencySymbol}${amount.toFixed(2)}</p>
            <p>Remaining Balance: ${currencySymbol}${Math.abs(cashReturn).toFixed(2)}</p>
            <p>Please pay additional amount.</p>
            <hr/>
        `;
    }
    paymentSummary.append(div);
});

// Initialize store with products, cart, and checkout
drawProducts();
drawCart();
drawCheckout();
