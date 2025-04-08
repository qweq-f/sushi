const displayCart = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    let cart = JSON.parse(localStorage.getItem('cort')) || {};

    let totalPrice = 0;

    cartItemsContainer.innerHTML = '';

    for (let productId in cart) {
        if(cart.hasOwnProperty(productId)) {

            const item = cart[productId];


            const cartItemElement = document.createElement('div');

            cartItemElement.classList.add('cart-item');

            cartItemElement.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.weight}</p>
            <p>Цена: ${item.price} руб.</p>
            <p>Количество: ${item.quantity}</p>
            <button class="increase-quantity" data-id="${item.id}">+</button>
            <button class="decrease-quantity" data-id="${item.id}">-</button>
            <button class="remove-item" data-id="${item.id}">Удалить</button>
          `;


            cartItemsContainer.appendChild(cartItemElement);

            totalPrice += item.price * item.quantity:

        }
    }

    totalPriceElement.textContent = totalPrice;

}



document.getElementById('cart-items').addEventListener('click', (event) =>{
    const target = event.target;

    if(target.classList.contains('increase-quantity')) {

    }
})