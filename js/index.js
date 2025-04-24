document.addEventListener('DOMContentLoaded', () =>
{
    const registeredUsername = localStorage.getItem('registeredUsername');
    if (!registeredUsername) {
        window.location.href = 'regest.html';
    } else {

        console.log('Пользователь зарегистрирован')

    }

    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const decreaseButton = card.querySelector('.quantity-selector__button[data-action="minus"]');
        const increaseButton = card.querySelector('.quantity-selector__button[data-action="plus"]');
        const quantityValue = card.querySelector('.quantity-selector__value');
        const addToCartButton = card.querySelector('.btn-outline-warning'); // Находим кнопку "В корзину"
        const productId = card.dataset.id; // Получаем ID товара из атрибута data-id
        const productTitle = card.querySelector('.product-card__title').textContent; // Получаем название товара
        const productPrice = parseInt(card.querySelector('.product-card__currency').textContent); // Получаем цену товара
        const productWeight = card.querySelector('.product-card__weight').textContent;


        decreaseButton.addEventListener('click', () => {
            let currentValue = parseInt(quantityValue.textContent);
            if (currentValue > 1) {
                quantityValue.textContent = currentValue - 1;
            }
        });



        increaseButton.addEventListener('click', () => {
            let currentValue = parseInt(quantityValue.textContent);
            quantityValue.textContent = currentValue + 1;
        });


        addToCartButton.addEventListener('click', () => {
            const quantity = parseInt(card.querySelector('.quantity-selector__value').textContent);// получение количества товара
            const productImage = card.querySelector('.product-card__image').src;
            addToCart(productId, productTitle, productPrice, quantity, productWeight,productImage); // вызываем функцию добавление в корзину
        });
    });

    // функция добавления товара в корзину
    const addToCart = (productId, productTitle, productPrice, quantity, productWeight,productImage) => {
        let localStorageData = JSON.parse(localStorage.getItem('cart')) || {};


        let cart = localStorageData['cart'] || {};


        if (cart[productId]) {
            cart[productId].quantity += quantity;
        } else {
            cart[productId] = {
                id: productId,
                title: productTitle,
                price: productPrice,
                quantity: quantity,
                weight: productWeight,
                imageUrl: productImage
            };
        }

        localStorageData['cart'] = cart; // Обновляем корзину в объекте данных
        localStorage.setItem('cart', JSON.stringify(localStorageData)); // Сохраняем обратно в localStorage
        alert('Товар добавлен в корзину!');

        updateCartCount();
    };


    const updateCartCount = () => {
        let localStorageData = JSON.parse(localStorage.getItem('cart')) || {};
        let cart = localStorageData['cart'] || {};
        let totalQuantity = 0;

        for(let productId in cart) {
            if(cart.hasOwnProperty(productId)){
                totalQuantity += cart[productId].quantity;
            }
        }

        const cartCountElement = document.querySelector('.cart-count');
        cartCountElement.textContent = totalQuantity;
    };
    updateCartCount();
});