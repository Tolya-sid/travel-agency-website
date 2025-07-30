# Сайт Турагентства - Руководство по развертыванию

## 📋 Описание проекта

Современный одностраничный сайт для турагентства с адаптивным дизайном, готовый для интеграции модуля поиска туров.

### ✨ Возможности:
- 📱 Полностью адаптивный дизайн
- 🎨 Современный UI/UX
- 📝 Рабочая форма обратной связи
- 🚀 Быстрая загрузка
- 📊 Готовность для интеграции системы поиска туров
- 🔍 SEO-оптимизация

## 🚀 Быстрый старт

### Локальное тестирование

1. **Скачайте файлы проекта:**
   - `index.html`
   - `styles.css`
   - `script.js`

2. **Откройте index.html в браузере** для предварительного просмотра

## 📁 Структура проекта

```
travel-agency-website/
├── index.html          # Основная HTML страница
├── styles.css          # CSS стили
├── script.js           # JavaScript функциональность
└── README.md           # Данная инструкция
```

## 🌐 Развертывание на хостинге

### Вариант 1: Обычный хостинг (рекомендуется для начала)

#### Шаги развертывания:

1. **Выберите хостинг-провайдера:**
   - 🇷🇺 Российские: Beget, Timeweb, reg.ru, SpaceWeb
   - 🌍 Международные: Hostinger, Bluehost, SiteGround

2. **Подключите домен к хостингу:**
   - В панели управления хостинга найдите раздел "Домены"
   - Добавьте ваш домен
   - Обновите DNS записи у регистратора домена

3. **Загрузите файлы:**
   ```
   Через FTP или файловый менеджер хостинга:
   - Загрузите все файлы в папку public_html/
   - Убедитесь, что index.html находится в корне
   ```

4. **Настройка DNS (если нужно):**
   ```
   A-запись: ваш-домен.ru → IP хостинга
   CNAME: www → ваш-домен.ru
   ```

### Вариант 2: Бесплатные платформы

#### GitHub Pages:
1. Создайте репозиторий на GitHub
2. Загрузите файлы
3. В настройках репозитория включите GitHub Pages
4. Подключите свой домен в настройках

#### Netlify:
1. Зарегистрируйтесь на netlify.com
2. Перетащите папку с файлами на страницу деплоя
3. Подключите домен в настройках

#### Vercel:
1. Зарегистрируйтесь на vercel.com
2. Подключите GitHub репозиторий или загрузите файлы
3. Настройте домен

## ⚙️ Настройка сайта

### 1. Основная информация

Отредактируйте в `index.html`:

```html
<!-- Название компании -->
<span>Ваше название</span>

<!-- Контактная информация -->
<p>+7 (ваш) номер-телефона</p>
<p>your-email@domain.ru</p>
<p>г. Ваш город, ул. Ваша улица, д. X</p>

<!-- Режим работы -->
<p>Ваш режим работы</p>
```

### 2. Цвета и стили

В `styles.css` найдите и измените:

```css
/* Основные цвета */
:root {
    --primary-color: #2563eb;     /* Основной цвет */
    --secondary-color: #64748b;   /* Вторичный цвет */
    --accent-color: #10b981;      /* Акцентный цвет */
}
```

### 3. Социальные сети

В `index.html` обновите ссылки:

```html
<div class="social-links">
    <a href="ваша-ссылка-vk" aria-label="VKontakte"><i class="fab fa-vk"></i></a>
    <a href="ваша-ссылка-telegram" aria-label="Telegram"><i class="fab fa-telegram"></i></a>
    <a href="ваша-ссылка-whatsapp" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
    <a href="ваша-ссылка-instagram" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
</div>
```

## 📧 Настройка формы обратной связи

### Вариант 1: Простая интеграция с FormSubmit

1. Замените форму в `index.html`:

```html
<form action="https://formsubmit.co/your-email@domain.ru" method="POST" class="contact-form">
    <input type="hidden" name="_subject" value="Новая заявка с сайта">
    <input type="hidden" name="_captcha" value="false">
    <input type="hidden" name="_next" value="https://ваш-домен.ru/thanks.html">
    
    <!-- Ваши поля формы остаются без изменений -->
</form>
```

### Вариант 2: Telegram Bot

1. Создайте бота в @BotFather
2. Добавьте в `script.js`:

```javascript
async function sendToTelegram(formData) {
    const botToken = 'ВАШ_BOT_TOKEN';
    const chatId = 'ВАШ_CHAT_ID';
    
    const message = `
🆕 Новая заявка с сайта:
👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
📧 Email: ${formData.email}
🎯 Услуга: ${formData.service}
💬 Сообщение: ${formData.message}
    `;
    
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    });
}
```

## 🔧 Дополнительные настройки

### 1. SEO оптимизация

Добавьте в `<head>`:

```html
<!-- Open Graph -->
<meta property="og:title" content="Ваше турагентство - лучшие туры">
<meta property="og:description" content="Описание вашего агентства">
<meta property="og:image" content="https://ваш-домен.ru/og-image.jpg">
<meta property="og:url" content="https://ваш-домен.ru">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Ваше турагентство">
<meta name="twitter:description" content="Описание вашего агентства">
<meta name="twitter:image" content="https://ваш-домен.ru/twitter-image.jpg">
```

### 2. Google Analytics

```html
<!-- В head секции -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. Yandex.Metrika

```html
<!-- Код счетчика Яндекс.Метрики -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(XXXXXX, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
```

## 🔄 Будущие обновления

### Интеграция модуля поиска туров

Когда будете готовы добавить поиск туров, можно:

1. **Добавить секцию поиска** в hero-секцию
2. **Интегрировать API** стороннего поставщика
3. **Создать страницы** результатов поиска
4. **Добавить фильтры** и сортировку

Пример структуры для поиска:

```html
<!-- Форма поиска туров -->
<div class="search-widget">
    <form class="tour-search-form">
        <div class="search-row">
            <input type="text" placeholder="Куда хотите поехать?">
            <input type="date" placeholder="Дата вылета">
            <input type="number" placeholder="Количество туристов">
            <button type="submit">Найти туры</button>
        </div>
    </form>
</div>
```

## 📞 Поддержка

Если возникнут вопросы:

1. **Проверьте документацию** вашего хостинг-провайдера
2. **Убедитесь в корректности** DNS настроек
3. **Проверьте файлы** на наличие ошибок в консоли браузера

## 🎯 Следующие шаги

1. ✅ Загрузите сайт на хостинг
2. ✅ Настройте домен
3. ✅ Обновите контактную информацию
4. ✅ Настройте форму обратной связи
5. ✅ Добавьте аналитику
6. ✅ Протестируйте на всех устройствах

**Удачи с запуском сайта! 🚀**
