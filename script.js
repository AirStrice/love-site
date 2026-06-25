// Ждём, пока страница полностью загрузится
document.addEventListener('DOMContentLoaded', function() {
    
    // Находим элементы на странице
    const button = document.getElementById('loveBtn');
    const heartElement = document.getElementById('heart');

    // Фраза для дождя
    const lovePhrase = 'I love you';
    // Массив цветов для дождя
    const rainColors = ['#ff3366', '#ff6699', '#ff99cc', '#ff0044', '#ff88aa', '#ff5555', '#ff77aa'];

    // Массив цветов для сердец
    const heartColors = ['#ff3366', '#ff6699', '#ff99cc', '#ff0044', '#ff88aa'];

    // ============================================
    // 🌧️ ФУНКЦИЯ ДОЖДЯ ИЗ БУКВ (с самого верха)
    // ============================================
    function createRainDrop() {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        
        // Выбираем случайный символ из фразы
        const randomIndex = Math.floor(Math.random() * lovePhrase.length);
        const char = lovePhrase[randomIndex];
        drop.textContent = char;
        
        // Случайный цвет
        drop.style.color = rainColors[Math.floor(Math.random() * rainColors.length)];
        
        // Случайный размер (от 14px до 28px)
        const size = 14 + Math.random() * 14;
        drop.style.fontSize = size + 'px';
        
        // Случайная позиция по горизонтали (по всему экрану)
        const x = Math.random() * window.innerWidth;
        drop.style.left = x + 'px';
        
        // Случайная скорость падения (от 1.5 до 4 секунд)
        const duration = 1.5 + Math.random() * 2.5;
        drop.style.animationDuration = duration + 's';
        
        // Случайная задержка перед появлением
        const delay = Math.random() * 0.3;
        drop.style.animationDelay = delay + 's';
        
        // Добавляем на страницу
        document.body.appendChild(drop);
        
        // Удаляем элемент после завершения анимации
        setTimeout(() => {
            drop.remove();
        }, (duration + delay) * 1000 + 100);
    }

    // ============================================
    // ❤️ ФУНКЦИЯ ЛЕТАЮЩЕГО СЕРДЦА
    // ============================================
    function createFlyingHeart() {
        const heart = document.createElement('div');
        heart.className = 'flying-heart';
        heart.textContent = '❤️';
        
        // Случайный цвет
        heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
        
        // Случайное положение по горизонтали (стартуем снизу)
        const x = Math.random() * window.innerWidth;
        heart.style.left = x + 'px';
        heart.style.bottom = '0px';
        
        // Случайный размер
        const size = 20 + Math.random() * 40;
        heart.style.fontSize = size + 'px';
        
        // Случайная длительность полёта
        const duration = 2 + Math.random() * 2;
        heart.style.animationDuration = duration + 's';
        
        // Добавляем на страницу
        document.body.appendChild(heart);
        
        // Удаляем элемент после завершения анимации
        setTimeout(() => {
            heart.remove();
        }, duration * 1000 + 100);
    }

    // ============================================
    // 🚀 ЗАПУСКАЕМ ДОЖДЬ СРАЗУ ПРИ ЗАГРУЗКЕ
    // ============================================
    
    // Создаём 3-6 капель каждые 40 мс (очень плотный дождь)
    setInterval(() => {
        // Создаём от 3 до 7 капель за раз
        const dropsPerFrame = 3 + Math.floor(Math.random() * 5);
        for (let i = 0; i < dropsPerFrame; i++) {
            createRainDrop();
        }
    }, 40);

    // Стартовые капли для быстрого начала
    setTimeout(() => {
        for (let i = 0; i < 50; i++) {
            setTimeout(createRainDrop, i * 20);
        }
    }, 100);

    // ============================================
    // ❤️ ЗАПУСК СЕРДЕЦ ПО КНОПКЕ
    // ============================================
    let isHeartRainActive = false;
    let heartInterval = null;

    button.addEventListener('click', function() {
        // Если уже запущено — создаём всплеск
        if (isHeartRainActive) {
            for (let i = 0; i < 40; i++) {
                setTimeout(createFlyingHeart, i * 25);
            }
            return;
        }

        isHeartRainActive = true;
        button.textContent = 'Сердца летят! ❤️';
        button.style.opacity = '0.8';

        // Запускаем непрерывный поток сердец
        heartInterval = setInterval(() => {
            // Создаём от 3 до 8 сердец за раз
            const heartsPerFrame = 3 + Math.floor(Math.random() * 6);
            for (let i = 0; i < heartsPerFrame; i++) {
                setTimeout(createFlyingHeart, i * 20);
            }
        }, 200);

        // Анимация нажатия
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);

        // Увеличиваем сердце в центре
        heartElement.style.transform = 'scale(1.5)';
        setTimeout(() => {
            heartElement.style.transform = 'scale(1)';
        }, 300);

        // Вибрация на мобильных устройствах
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }

        // Останавливаем сердца через 10 секунд
        setTimeout(() => {
            if (heartInterval) {
                clearInterval(heartInterval);
                heartInterval = null;
                isHeartRainActive = false;
                button.textContent = 'Запустить сердца';
                button.style.opacity = '1';
            }
        }, 10000);
    });

    console.log('❤️ Дождь из любви запущен! Нажмите кнопку для сердец!');
});
