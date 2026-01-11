// ВСТАВЬ СВОИ ДАННЫЕ ТУТ:
const TOKEN = "8560559993:AAEHeKHwiJyusyKKxbggO5IiLKRi8c7y7Wk"; // ТВОЙ_ТОКЕН_БОТА
const CHAT_ID = "6660000723"; // ТВОЙ_CHAT_ID

document.addEventListener('DOMContentLoaded', () => {
    // Получаем данные из localStorage, которые сохранились в Nike.html/Adidas.html
    const cart = JSON.parse(localStorage.getItem('myShopCart')) || [];
    const total = localStorage.getItem('cartTotalValue') || "0";
    const summaryDiv = document.getElementById('order-summary');

    // Показываем клиенту итог
    if (summaryDiv) {
        summaryDiv.innerHTML = `В корзине <b>${cart.length}</b> тов. на сумму <b>${total} сом</b>`;
    }

    document.getElementById('tg-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        // Формируем сообщение для тебя
        let message = `🔥 **НОВЫЙ ЗАКАЗ** 🔥\n\n`;
        message += `👤 Клиент: ${name}\n`;
        message += `📞 Тел: ${phone}\n\n`;
        message += `🛒 **Состав заказа:**\n`;
        
        cart.forEach((item, i) => {
            message += `${i + 1}. ${item.name} — ${item.price} сом\n`;
        });
        
        message += `\n💰 **ИТОГО: ${total} сом**`;

        const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });

            if (response.ok) {
                alert("Ура! Заказ отправлен в обработку.");
                localStorage.removeItem('myShopCart'); // Чистим корзину
                window.location.href = 'index.html'; // Домой
            }
        } catch (err) {
            alert("Произошла ошибка. Проверьте интернет.");
        }
    });
});