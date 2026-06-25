// Ждём, пока страница полностью загрузится
document.addEventListener('DOMContentLoaded', function() {
    
    // Находим элементы на странице
    const button = document.getElementById('loveBtn');
    const heartElement = document.getElementById('heart');

    // Массив разных цветов для летающих сердец
    const colors = ['#ff3366', '#ff6699', '#ff99cc', '#ff0044', '#ff88aa'];

    // Функция создания летающего сердца
    function createFlyingHeart() {
        const heart = document.createElement('div');
        heart.className = 'flying-heart';
        heart.textContent = '❤️';
        
        // Случайный цвет
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Случайное положение по горизонтали
        const x = Math.random() * window.innerWidth;
        heart.style.left = x + 'px';
        
        // Случайный размер
        const size = 20 + Math.random() * 40;
        heart.style.fontSize = size + 'px';
        
        // Случайная длительность полёта
        const duration = 2 + Math.random() * 2;
        heart.style.animationDuration = duration + 's';
        
        // Добавляем на страницу
        document.body.appendChild(heart);
        
        // Удаляем элемент после завершения анимации, чтобы не засорять память
        setTimeout(() => {
            heart.remove();
        }, duration * 1000 + 100);
    }

    // 🔥 ЗАПУСКАЕМ ЭФФЕКТ СРАЗУ ПРИ ЗАГРУЗКЕ
    // Бесконечный поток сердец
    setInterval(createFlyingHeart, 100);

    // Стартовые сердца для красоты (10 штук с задержкой)
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            setTimeout(createFlyingHeart, i * 150);
        }
    }, 500);

    // Обработчик нажатия на кнопку (для дополнительного эффекта)
    button.addEventListener('click', function() {
        // Создаём 20 сердец за раз
        for (let i = 0; i < 20; i++) {
            setTimeout(createFlyingHeart, i * 50);
        }

        // Анимация нажатия на кнопку
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);

        // Увеличиваем сердце в центре
        heartElement.style.transform = 'scale(1.5)';
        setTimeout(() => {
            heartElement.style.transform = 'scale(1)';
        }, 300);

        // Вибрация на мобильных устройствах (если поддерживается)
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }
    });
});