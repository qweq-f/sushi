document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const messageDiv = document.getElementById('message');
    const successMessageDiv = document.getElementById('success-message');
    successMessageDiv.style.display = 'none';

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Предотвращаем отправку формы

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            showMessage('Пароли не совпадают!', 'error');
            return;
        }

        // Простая проверка на минимальную длину пароля
        if (password.length < 6) {
            showMessage('Пароль должен содержать не менее 6 символов.', 'error');
            return;
        }

        // Сохраняем данные в localStorage
        localStorage.setItem('registeredUsername', username); //Сохраняем имя пользователя
        form.style.display = 'none';
        messageDiv.style.display = 'none';
        successMessageDiv.style.display = 'block';

        // Очищаем форму
        form.reset();
    });

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = 'message ' + type; // Добавляем класс для стилизации
        messageDiv.style.display = 'block'; // Make sure the message is visible
    }
});