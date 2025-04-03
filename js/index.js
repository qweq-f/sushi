// app.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Обработчики кнопок "+" и "-" (изменение количества)
    const quantitySelectors = document.querySelectorAll('.quantity-selector');

    quantitySelectors.forEach(selector => {
        const decreaseButton = selector.querySelector('.quantity-decrease');
        const increaseButton = selector.querySelector('.quantity-increase');
        const quantityValue = selector.querySelector('.quantity');

        decreaseButton.addEventListener('click', () => {
            let currentValue = parseInt(quantityValue.dataset.counter, 10);
            if (currentValue > 1) {
                currentValue--;
                quantityValue.dataset.counter = currentValue;
                quantityValue.textContent = currentValue;
            }
        });

        increaseButton.addEventListener('click', () => {
            let currentValue = parseInt(quantityValue.dataset.counter, 10);
            currentValue++;
            quantityValue.dataset.counter = currentValue;
            quantityValue.textContent = currentValue;
        });
    });

    // 2. Обработчики кнопок "В корзину"
    const addToCartButtons = document.querySelectorAll('.btn-outline-warning');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productId = productCard.dataset.id || generateUniqueId(); // Используем data-id или генерируем, если его нет
            const productName = productCard.querySelector('.product-card__title').textContent;
            const productWeight = productCard.querySelector('.product-card__weight').textContent;
            const productCurrency = productCard.querySelector('.product-card__currency').textContent;
            const quantity = parseInt(productCard.querySelector('.quantity').dataset.counter, 10);
            const productImage = productCard.querySelector('.product-card__image').src; // Получаем URL изображения

            const product = {
                id: productId,
                name: productName,
                weight: productWeight,
                currency: productCurrency,
                quantity: quantity,
                image: productImage // Сохраняем URL изображения в объект продукта
            };

            addToCart(product);
        });
    });

    // 3. Функция добавления в корзину (addToCart)
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]'); // Получаем корзину из localStorage или создаем пустой массив

// Проверяем, есть ли товар уже в корзине


        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            // Если товар уже есть, увеличиваем количество
            cart[existingProductIndex].quantity += product.quantity;
        } else {
            // Если товара нет, добавляем его в корзину
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем обновленную корзину в localStorage

        // Выводим сообщение (можно заменить на более красивое уведомление)
        alert(`${product.name} добавлен(ы) в корзину: ${product.quantity} шт.`);

        // Тут можно добавить обновление отображения корзины (если у вас есть элемент для этого)
        // updateCartDisplay();
    }

    // 4. Функция генерации уникального ID (если data-id отсутствует)
    function generateUniqueId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    // 5. (Опционально) Функция для обновления отображения корзины
    // function updateCartDisplay() {
    //   // Получите элемент, где отображается корзина (например, <div id="cart-items">)
    //   const cartItemsContainer = document.getElementById('cart-items');

    //   if (cartItemsContainer) {
    //     let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    //     cartItemsContainer.innerHTML = ''; // Очищаем предыдущее содержимое

    //     cart.forEach(item => {
    //       const cartItemElement = document.createElement('div');
    //       cartItemElement.textContent = `${item.name} - ${item.quantity} шт.`;
    //       cartItemsContainer.appendChild(cartItemElement);
    //     });
    //   }
    // }

    // (Опционально) Вызовите updateCartDisplay() при загрузке страницы, чтобы отобразить корзину, если она не пуста.
    // updateCartDisplay();
});






































document.addEventListener('DOMContentLoaded', () => {
    // 1. Обработчики кнопок "+" и "-" (изменение количества)
    const quantitySelectors = document.querySelectorAll('.quantity-selector');

    quantitySelectors.forEach(selector => {
        const decreaseButton = selector.querySelector('.quantity-decrease');
        const increaseButton = selector.querySelector('.quantity-increase');
        const quantityValue = selector.querySelector('.quantity');

        decreaseButton.addEventListener('click', () => {
            let currentValue = parseInt(quantityValue.dataset.counter, 10);
            if (currentValue > 1) {
                currentValue--;
                quantityValue.dataset.counter = currentValue;
                quantityValue.textContent = currentValue;
            }
        });

        increaseButton.addEventListener('click', () => {
            let currentValue = parseInt(quantityValue.dataset.counter, 10);
            currentValue++;
            quantityValue.dataset.counter = currentValue;
            quantityValue.textContent = currentValue;
        });
    });

    // 2. Обработчики кнопок "В корзину"
    const addToCartButtons = document.querySelectorAll('.btn-outline-warning');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productId = productCard.dataset.id;
            const productName = productCard.querySelector('.product-card__title').textContent;
            const productWeight = productCard.querySelector('.product-card__weight').textContent;
            const productCurrency = productCard.querySelector('.product-card__currency').textContent;
            const quantity = parseInt(productCard.querySelector('.quantity').dataset.counter, 10);
            const productImage = productCard.querySelector('.product-card__image').src; // Получаем URL изображения
            const productPrice = parseInt(productCard.querySelector('.product-card__currency').textContent, 10);

            const product = {
                id: productId,
                name: productName,
                weight: productWeight,
                currency: productCurrency,
                quantity: quantity,
                image: productImage, // Сохраняем URL изображения в объект продукта
                price: productPrice
            };

            addToCart(product);
        });
    });

    // 3. Функция добавления в корзину (addToCart)
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]'); // Получаем корзину из localStorage или создаем пустой массив

        // Проверяем, есть ли товар уже в корзине
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            // Если товар уже есть, увеличиваем количество
            cart[existingProductIndex].quantity += product.quantity;
        } else {
            // Если товара нет, добавляем его в корзину
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем обновленную корзину в localStorage

        // Тут можно добавить обновление отображения корзины (если у вас есть элемент для этого)
        updateCartDisplay();

        // Обновляем значок корзины (количество товаров)
        updateCartIcon();
    }

    // 4. Функция генерации уникального ID (если data-id отсутствует)
    function generateUniqueId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    // 5. Функция для обновления отображения корзины
    function updateCartDisplay() {
        // Получите элемент, где отображается корзина (например, <div id="cart-items">)
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');

        if (cartItemsContainer && cartTotalElement) {
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cartItemsContainer.innerHTML = ''; // Очищаем предыдущее содержимое

            let total = 0;

            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item'); // Для стилизации CSS
                cartItemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item__image">
          <span class="cart-item__name">${item.name}</span>
          <span class="cart-item__quantity">${item.quantity} шт.</span>
          <span class="cart-item__price">${item.price * item.quantity}</span>
        `;

                cartItemsContainer.appendChild(cartItemElement);
                total += item.price * item.quantity;
            });

            cartTotalElement.textContent = `Итого: ${total}`;
        }
    }

    // 6. Функция для обновления значка корзины (отображает количество товаров)
    function updateCartIcon() {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        let totalQuantity = 0;
        cart.forEach(item => {
            totalQuantity += item.quantity;
        });
        document.getElementById('cart-count').textContent = totalQuantity;
    }


    // Вызовите updateCartDisplay() при загрузке страницы, чтобы отобразить корзину, если она не пуста.
    updateCartDisplay();

    // Обновляем значок корзины при загрузке страницы
    updateCartIcon();
});
