const displayCart = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Получаем объект из localStorage, и уже из него извлекаем корзину
    let localStorageData = JSON.parse(localStorage.getItem('cart')) || {};
    let cart = localStorageData['cart'] || {}; // Получаем объект корзины

    let totalPrice = 0;

    cartItemsContainer.innerHTML = '';

    for (let productId in cart) {
        if (cart.hasOwnProperty(productId)) {
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
            totalPrice += item.price * item.quantity;
        }
    }

    totalPriceElement.textContent = totalPrice;
};

document.getElementById('cart-items').addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('increase-quantity')) {
        const productId = target.dataset.id;
        changeQuantity(productId, 1);
        displayCart();
    } else if (target.classList.contains('decrease-quantity')) {
        const productId = target.dataset.id;
        changeQuantity(productId, -1);
        displayCart();
    } else if (target.classList.contains('remove-item')) {
        const productId = target.dataset.id;
        removeItem(productId);
        displayCart();
    }
});

const changeQuantity = (productId, change) => {
    let localStorageData = JSON.parse(localStorage.getItem('cart')) || {};
    let cart = localStorageData['cart'] || {};

    if (cart[productId]) {
        cart[productId].quantity += change;
        if (cart[productId].quantity <= 0) {
            delete cart[productId];
        }

        localStorageData['cart'] = cart; // Обновляем корзину в объекте
        localStorage.setItem('cart', JSON.stringify(localStorageData)); // Сохраняем обратно в localStorage
        updateCartCount();
    }
};

const removeItem = (productId) => {
    let localStorageData = JSON.parse(localStorage.getItem('cart')) || {};
    let cart = localStorageData['cart'] || {};
    delete cart[productId];

    localStorageData['cart'] = cart; // Обновляем корзину в объекте
    localStorage.setItem('cart', JSON.stringify(localStorageData)); // Сохраняем обратно в localStorage
    updateCartCount();
};

const updateCartCount = () => {
    let localStorageData = JSON.parse(localStorage.getItem('cart')) || {};
    let cart = localStorageData['cart'] || {};
    let totalQuantity = 0;

    for (let productId in cart) {
        if (cart.hasOwnProperty(productId)) {
            totalQuantity += cart[productId].quantity;
        }
    }

    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = totalQuantity;
};

displayCart();

