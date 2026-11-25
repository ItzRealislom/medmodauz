// --- 1. ГЕНЕРАТОР РАЗМЕРОВ (42-60) ---
function generateSizes(stockLevel) {
    const sizes = {};
    for (let i = 42; i <= 60; i += 2) {
        sizes[i] = Math.floor(Math.random() * (stockLevel + 1));
    }
    return sizes;
}

// --- 2. ТОВАРЫ ---
const products = [
    { id: 1, name: "Халат медицинский женский (Классика)", price: 125000, gender: "female", category: "robe", img: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=500&q=80", video: null, sizes: generateSizes(10) },
    { id: 2, name: "Хирургический костюм мужской", price: 175000, gender: "male", category: "suit", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=80", video: "https://www.w3schools.com/html/mov_bbb.mp4", sizes: generateSizes(8) },
    { id: 3, name: "Халат медицинский мужской", price: 135000, gender: "male", category: "robe", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=80", video: null, sizes: generateSizes(7) },
    { id: 4, name: "Костюм женский (Мятный)", price: 170000, gender: "female", category: "suit", img: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=500&q=80", video: null, sizes: generateSizes(5) },
    { id: 5, name: "Униформа женская (Розовая)", price: 180000, gender: "female", category: "suit", img: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=500&q=80", video: null, sizes: generateSizes(6) },
    { id: 6, name: "Халат медицинский синий", price: 120000, gender: "female", category: "robe", img: "images/bluerobe.jpg", video: null, sizes: generateSizes(9) },
    { id: 7, name: "Медицинский костюм (Бордовый)", price: 185000, gender: "female", category: "suit", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80", video: null, sizes: generateSizes(4) },
    { id: 8, name: "Сабо медицинские (Белые)", price: 150000, gender: "unisex", category: "shoes", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80", video: null, sizes: { "36": 5, "37": 3, "38": 10, "39": 8, "40": 5, "41": 2 } },
    { id: 9, name: "Сабо ортопедические (Синие)", price: 160000, gender: "unisex", category: "shoes", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80", video: null, sizes: { "36": 2, "37": 4, "38": 6, "39": 5, "40": 3, "41": 1 } },
    { id: 10, name: "Униформа MuzEX Premium", price: 185000, gender: "male", category: "suit", img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=500&q=80", video: null, sizes: generateSizes(7) },
    { id: 11, name: "Халат медицинский (Укороченный)", price: 130000, gender: "female", category: "robe", img: "https://images.unsplash.com/photo-1584982751601-97d8cf1221b6?w=500&q=80", video: null, sizes: generateSizes(8) },
    { id: 12, name: "Шапочка с принтом", price: 70000, gender: "female", category: "hat", img: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&q=80", video: null, sizes: { "One Size": 20 } },
    { id: 13, name: "Костюм хирургический (Зеленый)", price: 175000, gender: "unisex", category: "suit", img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=500&q=80", video: null, sizes: generateSizes(6) },
    { id: 14, name: "Халат-платье медицинское", price: 140000, gender: "female", category: "robe", img: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=500&q=80", video: null, sizes: generateSizes(5) },
    { id: 15, name: "Тёплый халат зимний", price: 190000, gender: "unisex", category: "robe", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=80", video: null, sizes: generateSizes(10) },
    { id: 16, name: "Медицинская куртка", price: 170000, gender: "male", category: "suit", img: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=500&q=80", video: null, sizes: generateSizes(6) }
];

// --- 3. UZUM СТАТИСТИКА ---
const uzumStats = { orders: 348, rating: "4.7", reviews: 79 };
function loadUzumStats() {
    const orderEl = document.getElementById('uzum-orders');
    const ratingEl = document.getElementById('uzum-rating');
    const reviewsEl = document.getElementById('uzum-reviews');
    if (orderEl && ratingEl && reviewsEl) {
        orderEl.textContent = uzumStats.orders;
        ratingEl.textContent = uzumStats.rating;
        reviewsEl.textContent = uzumStats.reviews;
    }
}
document.addEventListener('DOMContentLoaded', loadUzumStats);

// --- 4. ПАДАЮЩИЕ ЛИСТЬЯ (ТЕМЫ) ---
const themeEmojis = {
    autumn: ['🍁', '🍂', '🍃'],
    winter: ['❄️', '❅', '❆'],
    spring: ['🌸', '🌺', '🌼'],
    summer: ['☀️', '🌻', '🌴']
};

function createLeaves(theme) {
    const container = document.getElementById('leaves-container');
    container.innerHTML = ''; // Очищаем старые
    const emojis = themeEmojis[theme] || themeEmojis.autumn;
    const count = 25;
    for (let i = 0; i < count; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.fontSize = (Math.random() * 20 + 15) + 'px';
        leaf.style.animationDuration = (Math.random() * 5 + 5) + 's';
        leaf.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(leaf);
    }
}

// Переключение темы
function changeTheme() {
    const theme = document.getElementById('theme-select').value;
    document.body.setAttribute('data-theme', theme);
    createLeaves(theme);
    localStorage.setItem('medmoda-theme', theme);
}

// Инициализация темы при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('medmoda-theme') || 'autumn';
    document.getElementById('theme-select').value = savedTheme;
    document.body.setAttribute('data-theme', savedTheme);
    createLeaves(savedTheme);
});

// --- 5. РЕНДЕР ТОВАРОВ ---
function renderProducts(productsToRender) {
    const container = document.getElementById('products-container');
    const noMsg = document.getElementById('no-products-msg');
    container.innerHTML = "";

    if (productsToRender.length === 0) {
        noMsg.style.display = "block";
        return;
    }
    noMsg.style.display = "none";

    productsToRender.forEach(product => {
        const totalStock = Object.values(product.sizes).reduce((a, b) => a + b, 0);
        
        let stockBadge = '';
        if (totalStock === 0) {
            stockBadge = `<span class="badge out-of-stock">Нет в наличии</span>`;
        } else if (totalStock <= 5) {
            stockBadge = `<span class="badge low-stock">Осталось мало (${totalStock})</span>`;
        } else {
            stockBadge = `<span class="badge in-stock">В наличии</span>`;
        }

        // Опции размеров (сортируем числовые ключи)
        let sizeOptions = '';
        const sizeKeys = Object.keys(product.sizes).sort((a, b) => {
            const numA = parseInt(a), numB = parseInt(b);
            if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
            return a.localeCompare(b);
        });
        
        for (const size of sizeKeys) {
            const qty = product.sizes[size];
            sizeOptions += `<option value="${size}" ${qty === 0 ? 'disabled' : ''}>${size} ${qty === 0 ? '(Нет)' : ''}</option>`;
        }

        const card = document.createElement('div');
        card.className = 'product-card animate-on-scroll show';
        card.innerHTML = `
            <div class="card-media">
                <img src="${product.img}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x300?text=Нет+фото'">
                ${stockBadge}
                ${product.video ? `<button class="btn-video" onclick="alert('Тут будет воспроизводиться видео: ${product.video}')">▶ Смотреть видео</button>` : ''}
            </div>
            <h3>${product.name}</h3>
            <p class="price">${product.price.toLocaleString('ru-RU')} UZS</p>
            
            <div class="selectors">
                <select id="size-${product.id}" class="select-size">
                    <option value="" disabled selected>Размер</option>
                    ${sizeOptions}
                </select>
                <select id="color-${product.id}" class="select-color">
                    <option value="Белый">Цвет: Белый</option>
                    <option value="Голубой">Цвет: Голубой</option>
                    <option value="Зеленый">Цвет: Зеленый</option>
                    <option value="Розовый">Цвет: Розовый</option>
                    <option value="Бордовый">Цвет: Бордовый</option>
                </select>
            </div>

            <button class="btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price})" data-btn="buy" ${totalStock === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                ${totalStock === 0 ? 'Нет в наличии' : 'В корзину'}
            </button>
        `;
        container.appendChild(card);
    });
}

// --- 6. ФИЛЬТРАЦИЯ (С РАЗМЕРАМИ) ---
function applyFilters() {
    const gender = document.getElementById('filter-gender').value;
    const category = document.getElementById('filter-category').value;
    const size = document.getElementById('filter-size').value;
    const minPrice = parseInt(document.getElementById('filter-min-price').value) || 0;
    const maxPrice = parseInt(document.getElementById('filter-max-price').value) || 9999999;

    const filtered = products.filter(p => {
        const matchGender = gender === 'all' || p.gender === gender || p.gender === 'unisex';
        const matchCategory = category === 'all' || p.category === category;
        const matchPrice = p.price >= minPrice && p.price <= maxPrice;
        
        // Фильтр по размеру: товар должен иметь этот размер в наличии
        let matchSize = true;
        if (size !== 'all') {
            matchSize = p.sizes && p.sizes[size] !== undefined && p.sizes[size] > 0;
        }
        
        return matchGender && matchCategory && matchPrice && matchSize;
    });

    renderProducts(filtered);
}

renderProducts(products);

// --- 7. КОРЗИНА ---
let cart = [];
function toggleCart() { document.getElementById('cart-modal').classList.toggle('open'); }

function addToCart(id, name, price) {
    const sizeSelect = document.getElementById(`size-${id}`);
    const size = sizeSelect.value;
    
    if (!size) {
        alert("Пожалуйста, выберите размер!");
        sizeSelect.focus();
        return;
    }

    const color = document.getElementById(`color-${id}`).value;
    const existing = cart.find(item => item.id === id && item.size === size && item.color === color);
    
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, name, price, size, color, qty: 1 });
    }
    
    updateCartUI();
    
    const btn = event.target;
    const oldText = btn.textContent;
    btn.textContent = "✔ Добавлено";
    btn.style.background = "#28a745";
    setTimeout(() => { btn.textContent = oldText; btn.style.background = ""; }, 1500);
}

function removeFromCart(id, size, color) {
    cart = cart.filter(item => !(item.id === id && item.size === size && item.color === color));
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    let total = 0, count = 0;
    cartItems.innerHTML = "";

    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;
        
        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p style="font-size: 12px; color: #666; margin-bottom: 5px;">Размер: ${item.size} | Цвет: ${item.color}</p>
                    <p>${item.qty} шт. x ${item.price.toLocaleString('ru-RU')} UZS</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id}, '${item.size}', '${item.color}')">✖</button>
            </div>
        `;
    });

    document.getElementById('cart-count').textContent = count;
    document.getElementById('cart-total-price').textContent = total.toLocaleString('ru-RU');
}

function checkoutTelegram() {
    if (cart.length === 0) return alert("Корзина пуста!");
    let msg = "Здравствуйте! Хочу сделать заказ с сайта MedModa:\n\n";
    let sum = 0;
    
    cart.forEach((item, i) => {
        msg += `${i + 1}. ${item.name} (Размер: ${item.size}, Цвет: ${item.color}) — ${item.qty} шт. (${item.price.toLocaleString('ru-RU')} UZS)\n`;
        sum += item.price * item.qty;
    });
    
    msg += `\nИтого: ${sum.toLocaleString('ru-RU')} UZS.\nЖду обратной связи!`;
    window.open(`https://t.me/Azamjanovna_Fotima?text=${encodeURIComponent(msg)}`, '_blank');
}

// --- 8. АНИМАЦИЯ ПРИ СКРОЛЛЕ ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// --- 9. МУЛЬТИЯЗЫЧНОСТЬ ---
const translations = {
    ru: {
        nav_home: "Главная", nav_about: "О нас", nav_uzum: "На Uzum", nav_products: "Каталог", nav_contacts: "Контакты",
        hero_title: "Медицинская одежда европейского уровня",
        hero_subtitle: "Частная компания «Muzex group» более 20 лет производит профессиональную экипировку премиум-класса.",
        hero_btn: "Перейти к покупкам",
        badge_new: "Новая коллекция 2026",
        badge_uzum: "Рейтинг на Uzum: 4.7",
        uzum_title: "Нам доверяют на Uzum Market",
        uzum_orders: "Заказов", uzum_rating: "Рейтинг (★)", uzum_reviews: "Отзывов",
        uzum_link: "Перейти в наш магазин на Uzum",
        adv_title: "Почему выбирают нас",
        adv_1_title: "Европейский стиль", adv_1_desc: "Используем высококачественные материалы и передовые лекала. Наша форма подчеркивает статус.",
        adv_2_title: "Опыт с 2005 года", adv_2_desc: "Уже более 20 лет мы являемся одним из крупнейших производителей медицинской одежды в Узбекистане.",
        adv_3_title: "Международное доверие", adv_3_desc: "Экспортируем продукцию в Казахстан, Туркменистан, Таджикистан и Кыргызстан.",
        adv_4_title: "Широкий ассортимент", adv_4_desc: "Кроме униформы производим: постельное белье, сумки, футболки, жилетки и полотенца.",
        about_title: "О компании MuzEX Group", clients_title: "Наши крупные клиенты и партнеры:",
        products_title: "Каталог товаров", filter_title: "Фильтр:", filter_btn: "Применить",
        filter_gender_all: "Все (Пол)", filter_gender_female: "Женщинам", filter_gender_male: "Мужчинам", filter_gender_unisex: "Унисекс",
        filter_cat_all: "Все категории", filter_cat_robe: "Халаты", filter_cat_suit: "Костюмы", filter_cat_hat: "Шапочки", filter_cat_shoes: "Обувь",
        filter_size_all: "Все размеры",
        contacts_title: "Свяжитесь с нами", btn_buy: "В корзину", cart_title: "Ваша корзина", cart_checkout: "Оформить заказ",
        about_text: `Частная компания <b>«Muzex group»</b> более 20 лет (с 2005 года) является производителем профессиональной высококачественной медицинской одежды европейского уровня. В частности: халаты, костюмы, хирургическая форма, головные уборы, обувь медицинская и др.<br><br>
        Кроме того, по заказу мы производим постельное бельё, сумки рекламные (тканевые и кожаные с брендом), футболки, жилетки плащевые, полотенца с логотипом фирмы и т.п.<br><br>
        Мы осуществляем экспорт своей продукции в Казахстан, Туркменистан, Таджикистан и Кыргызстан.`
    },
    uz: {
        nav_home: "Asosiy", nav_about: "Biz haqimizda", nav_uzum: "Uzum'da", nav_products: "Katalog", nav_contacts: "Aloqa",
        hero_title: "Yevropa darajasidagi tibbiyot kiyimlari",
        hero_subtitle: "«Muzex group» xususiy kompaniyasi 20 yildan ortiq vaqt davomida premium darajadagi maxsus kiyimlarni ishlab chiqarmoqda.",
        hero_btn: "Xarid qilish",
        badge_new: "Yangi kolleksiya 2026",
        badge_uzum: "Uzum'dagi reyting: 4.7",
        uzum_title: "Uzum Market'da bizga ishonishadi",
        uzum_orders: "Buyurtmalar", uzum_rating: "Reyting (★)", uzum_reviews: "Sharhlar",
        uzum_link: "Uzum'dagi do'konimizga o'ting",
        adv_title: "Nima uchun bizni tanlashadi",
        adv_1_title: "Yevropa uslubi", adv_1_desc: "Yuqori sifatli materiallardan foydalanamiz. Bizning forma maqomni ta'kidlaydi.",
        adv_2_title: "2005 yildan tajriba", adv_2_desc: "20 yildan ortiq vaqtdan beri O'zbekistondagi eng yirik ishlab chiqaruvchilardanmiz.",
        adv_3_title: "Xalqaro ishonch", adv_3_desc: "Qozog'iston, Turkmaniston, Tojikiston va Qirg'izistonga eksport qilamiz.",
        adv_4_title: "Keng assortiment", adv_4_desc: "Kiyimlardan tashqari choyshablar, sumkalar, futbolkalar va sochiqlar ishlab chiqaramiz.",
        about_title: "MuzEX Group kompaniyasi", clients_title: "Bizning yirik mijozlarimiz:",
        products_title: "Mahsulotlar katalogi", filter_title: "Filtr:", filter_btn: "Qo'llash",
        filter_gender_all: "Barchasi", filter_gender_female: "Ayollar uchun", filter_gender_male: "Erkaklar uchun", filter_gender_unisex: "Uniseks",
        filter_cat_all: "Barcha toifalar", filter_cat_robe: "Xalatlar", filter_cat_suit: "Kostyumlar", filter_cat_hat: "Qalpog'lar", filter_cat_shoes: "Oyoq kiyim",
        filter_size_all: "Barcha o'lchamlar",
        contacts_title: "Biz bilan bog'laning", btn_buy: "Savatchaga", cart_title: "Savatcha", cart_checkout: "Buyurtma berish",
        about_text: `<b>«Muzex group»</b> kompaniyasi 20 yildan ortiq (2005 yildan) tajribaga ega bo'lib, xalatlar, kostyumlar, xirurgik formalar va boshqa tibbiyot kiyimlarini ishlab chiqaradi.<br><br>
        Shuningdek, buyurtma asosida choyshablar, reklama sumkalari, futbolkalar va logotipli sochiqlar tayyorlaymiz.<br><br>
        Mahsulotlarimizni Qozog'iston, Turkmaniston, Tojikiston va Qirg'izistonga eksport qilamiz.`
    },
    en: {
        nav_home: "Home", nav_about: "About Us", nav_uzum: "On Uzum", nav_products: "Catalog", nav_contacts: "Contacts",
        hero_title: "European Level Medical Clothing",
        hero_subtitle: "Muzex group has been producing premium professional workwear for over 20 years.",
        hero_btn: "Shop Now",
        badge_new: "New Collection 2026",
        badge_uzum: "Uzum Rating: 4.7",
        uzum_title: "Trusted on Uzum Market",
        uzum_orders: "Orders", uzum_rating: "Rating (★)", uzum_reviews: "Reviews",
        uzum_link: "Visit Our Uzum Store",
        adv_title: "Why Choose Us",
        adv_1_title: "European Style", adv_1_desc: "We use high-quality materials and modern patterns. Our uniforms emphasize status.",
        adv_2_title: "Experience since 2005", adv_2_desc: "For over 20 years, we have been one of the largest manufacturers in Uzbekistan.",
        adv_3_title: "International Trust", adv_3_desc: "We export to Kazakhstan, Turkmenistan, Tajikistan, and Kyrgyzstan.",
        adv_4_title: "Wide Range", adv_4_desc: "Besides uniforms, we produce bed linen, bags, t-shirts, and towels.",
        about_title: "About MuzEX Group", clients_title: "Our Major Clients:",
        products_title: "Product Catalog", filter_title: "Filter:", filter_btn: "Apply",
        filter_gender_all: "All (Gender)", filter_gender_female: "Women", filter_gender_male: "Men", filter_gender_unisex: "Unisex",
        filter_cat_all: "All Categories", filter_cat_robe: "Robes", filter_cat_suit: "Suits", filter_cat_hat: "Hats", filter_cat_shoes: "Shoes",
        filter_size_all: "All Sizes",
        contacts_title: "Contact Us", btn_buy: "Add to Cart", cart_title: "Your Cart", cart_checkout: "Checkout",
        about_text: `The private company <b>"Muzex group"</b> has been producing professional medical clothing of European standards for over 20 years (since 2005). Specifically: robes, suits, surgical uniforms, hats, shoes, etc.<br><br>
        Additionally, we custom-make bed linens, promotional bags, t-shirts, vests, and branded towels.<br><br>
        We export our products to Kazakhstan, Turkmenistan, Tajikistan, and Kyrgyzstan.`
    }
};

function changeLanguage() {
    const lang = document.getElementById('lang-select').value;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key] && !el.children.length) el.textContent = translations[lang][key];
    });
    document.getElementById('about-text').innerHTML = translations[lang].about_text;
    document.querySelectorAll('[data-btn="buy"]').forEach(btn => {
        if(btn.textContent !== "✔ Добавлено" && !btn.disabled) btn.textContent = translations[lang].btn_buy;
    });
}