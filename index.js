document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById('mySlider');
    const dots = document.querySelectorAll('.t-dot');
    const nBtn = document.getElementById('nBtn');
    const pBtn = document.getElementById('pBtn');

    let count = 0;
    const totalSlides = 4;
    let timer;

    // --- 1. ФУНКЦИЯ ДВИЖЕНИЯ ---
    function move() {
        if (count >= totalSlides) count = 0;
        if (count < 0) count = totalSlides - 1;
        
        slider.style.transform = `translateX(${-count * 100}%)`;
        
        dots.forEach((d, i) => d.classList.toggle('active', i === count));
        resetTimer(); // Сбрасываем таймер при каждом переключении
    }

    // --- 2. АВТОМАТИЧЕСКИЙ СКРОЛЛ ---
    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(() => {
            count++;
            move();
        }, 2000); // 5000 мс = 5 секунд
    }

    // --- 3. УПРАВЛЕНИЕ КНОПКАМИ ---
    nBtn.addEventListener('click', () => { count++; move(); });
    pBtn.addEventListener('click', () => { count--; move(); });

    // --- 4. ПОДДЕРЖКА СВАЙПА ПАЛЬЦЕМ (Touch Events) ---
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const swipeDistance = touchStartX - touchEndX;
        if (swipeDistance > 50) {
            // Свайп влево -> следующий слайд
            count++;
            move();
        } else if (swipeDistance < -50) {
            // Свайп вправо -> предыдущий слайд
            count--;
            move();
        }
    }

    // Запускаем таймер при загрузке
    resetTimer();
});
const cccc = document.getElementById('cart')
const goBtn3 = document.getElementById('Nike');
const goBtn2 = document.getElementById('Li-Ning');
const goBtn = document.getElementById('Adidas');

if (cccc) {
    cccc.addEventListener('click',() => {
        window.location.href = "lalal.html"
    })
}
if (goBtn) {
    goBtn.addEventListener('click', () => {
        window.location.href = "Adidas.html";
    });
}
if (goBtn2) {
    goBtn2.addEventListener('click', () => {
        window.location.href = "Li-Ning.html";
    })
}
if (goBtn3) {
    goBtn3.addEventListener('click', () => {
        window.location.href = "Nike.html";
    })
}
const gotext = document.getElementById('textnike');
const gotext2 = document.getElementById('textlining');
const gotext3 = document.getElementById('textAdidas');
const goimg = document.getElementById('imggo');
if (goimg) {
    goimg.addEventListener('click', () => {
        window.location.href = "index.html";
    });
}
if (gotext) {
    gotext.addEventListener('click',() => {
        window.location.href = "Nike.html";
    });
}
if (gotext2) {
    gotext2.addEventListener('click',() => {
        window.location.href = "Li-Ning.html";
    });
}
if (gotext3) {
    gotext3.addEventListener('click',() => {
        window.location.href = "Adidas.html";
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // Загружаем данные из памяти или создаем пустой массив
    let cart = JSON.parse(localStorage.getItem('myShopCart')) || [];

    // Ищем элементы (теперь код не сломается, если их нет)
    const cartModal = document.getElementById('cart-modal');
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeBtn = document.getElementById('close-cart');
    const buyButtons = document.querySelectorAll('.btnnike');
    const checkoutBtn = document.querySelector('.checkout-btn');

    function updateCartUI() {
        if (!cartList || !cartTotal) return; // Проверка на наличие элементов

        cartList.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            // Отрисовка без тире, цена справа (через CSS)
            li.innerHTML = 
                `<span>${item.name}</span>
                <div class="cart-item-right">
                    <span class="cart-item-price">${item.price} сом</span>
                    <button class="remove-btn" onclick="removeItem(${index})">×</button>
                </div>`
            ;
            cartList.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = total;
        // Сохраняем актуальную корзину и сумму
        localStorage.setItem('myShopCart', JSON.stringify(cart));
        localStorage.setItem('cartTotalValue', total);
    }

    // Глобальная функция удаления
    window.removeItem = (index) => {
        cart.splice(index, 1);
        updateCartUI();
    };

    // Вешаем события только если кнопки найдены
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name') || "Товар";
            const price = parseInt(button.getAttribute('data-price')) || 0;
            cart.push({ name, price });
            updateCartUI();

            if (cartModal && cartOverlay) {
                cartModal.classList.add('active');
                cartOverlay.classList.add('active');
            }
        });
    });

    if (checkoutBtn) {
        checkoutBtn.onclick = () => {
            if (cart.length > 0) window.location.href = 'lalal.html';
        };
    }

    // Закрытие
    const closeCart = () => {
        if (cartModal) cartModal.classList.remove('active');
        if (cartOverlay) cartOverlay.classList.remove('active');
    };

    if (closeBtn) closeBtn.onclick = closeCart;
    if (cartOverlay) cartOverlay.onclick = closeCart;

    // Обновляем список при загрузке любой страницы
    updateCartUI();
});