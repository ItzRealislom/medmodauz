const API_URL = '/api';
let token = localStorage.getItem('adminToken');

if (token) showAdminScreen();

// --- АВТОРИЗАЦИЯ ---
async function login() {
    const password = document.getElementById('password-input').value;
    const errorEl = document.getElementById('login-error');
    
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        
        const data = await res.json();
        if (res.ok) {
            token = data.token;
            localStorage.setItem('adminToken', token);
            showAdminScreen();
        } else {
            errorEl.textContent = data.error || 'Ошибка входа';
        }
    } catch (err) {
        errorEl.textContent = 'Ошибка сервера';
    }
}

function logout() {
    token = null;
    localStorage.removeItem('adminToken');
    document.getElementById('admin-screen').classList.remove('active');
    document.getElementById('login-screen').classList.add('active');
    document.getElementById('password-input').value = '';
}

function showAdminScreen() {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('admin-screen').classList.add('active');
    loadProducts();
}

// --- ВАЛИДАЦИЯ ФАЙЛОВ (КАК В УЗУМЕ) ---
document.getElementById('p-photos').addEventListener('change', function(e) {
    const files = e.target.files;
    const errorEl = document.getElementById('photo-error');
    errorEl.textContent = '';
    if (files.length > 6) { errorEl.textContent = 'Максимум 6 фото!'; e.target.value = ''; return; }
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    for (let file of files) {
        if (!allowed.includes(file.type)) { errorEl.textContent = 'Только JPEG, PNG, WebP!'; e.target.value = ''; return; }
        if (file.size > 10 * 1024 * 1024) { errorEl.textContent = 'Файл больше 10 МБ!'; e.target.value = ''; return; }
    }
});

document.getElementById('p-videos').addEventListener('change', function(e) {
    const files = e.target.files;
    const errorEl = document.getElementById('video-error');
    errorEl.textContent = '';
    if (files.length > 2) { errorEl.textContent = 'Максимум 2 видео!'; e.target.value = ''; return; }
    const allowed = ['video/mp4', 'video/webm'];
    for (let file of files) {
        if (!allowed.includes(file.type)) { errorEl.textContent = 'Только MP4, WebM!'; e.target.value = ''; return; }
    }
});

// --- CRUD (Создание, Чтение, Обновление, Удаление) ---
async function loadProducts() {
    try {
        const res = await fetch(`${API_URL}/products`);
        const products = await res.json();
        renderProductList(products);
    } catch (err) { console.error(err); }
}

function renderProductList(products) {
    const container = document.getElementById('products-list');
    container.innerHTML = '';
    if (products.length === 0) { container.innerHTML = '<p style="text-align:center; color:#888;">Товаров нет</p>'; return; }
    
    products.forEach(p => {
        const item = document.createElement('div');
        item.className = 'product-item';
        item.innerHTML = `
            <img src="${p.photos && p.photos[0] ? p.photos[0] : 'https://via.placeholder.com/60'}" alt="">
            <div class="product-info">
                <h4>${p.name}</h4>
                <p>${p.price.toLocaleString('ru-RU')} UZS</p>
            </div>
            <div class="product-actions">
                <button class="btn-edit" onclick="editProduct('${p.id}')">Ред.</button>
                <button class="btn-delete" onclick="deleteProduct('${p.id}')">Удал.</button>
            </div>
        `;
        container.appendChild(item);
    });
}

document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('product-id').value;
    const formData = new FormData();
    
    formData.append('name', document.getElementById('p-name').value);
    formData.append('price', document.getElementById('p-price').value);
    formData.append('description', document.getElementById('p-desc').value);
    formData.append('category', document.getElementById('p-category').value);
    formData.append('gender', document.getElementById('p-gender').value);
    
    try {
        const sizes = JSON.parse(document.getElementById('p-sizes').value || '{}');
        formData.append('sizes', JSON.stringify(sizes));
    } catch (e) { alert('Ошибка в JSON размерах!'); return; }
    
    const colors = document.getElementById('p-colors').value.split(',').map(c => c.trim()).filter(c => c);
    formData.append('colors', JSON.stringify(colors));
    
    const photoInput = document.getElementById('p-photos');
    for (let i = 0; i < photoInput.files.length; i++) formData.append('photos', photoInput.files[i]);
    
    const videoInput = document.getElementById('p-videos');
    for (let i = 0; i < videoInput.files.length; i++) formData.append('videos', videoInput.files[i]);
    
    const url = id ? `${API_URL}/products/${id}` : `${API_URL}/products`;
    const method = id ? 'PUT' : 'POST';
    
    try {
        const res = await fetch(url, {
            method: method,
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        
        if (res.ok) {
            alert('Сохранено!');
            resetForm();
            loadProducts();
        } else {
            const data = await res.json();
            alert(data.error || 'Ошибка');
        }
    } catch (err) { alert('Ошибка сервера'); }
});

async function editProduct(id) {
    const res = await fetch(`${API_URL}/products`);
    const products = await res.json();
    const p = products.find(item => item.id === id);
    if (!p) return;
    
    document.getElementById('product-id').value = p.id;
    document.getElementById('p-name').value = p.name;
    document.getElementById('p-price').value = p.price;
    document.getElementById('p-desc').value = p.description || '';
    document.getElementById('p-category').value = p.category;
    document.getElementById('p-gender').value = p.gender;
    document.getElementById('p-sizes').value = JSON.stringify(p.sizes);
    document.getElementById('p-colors').value = (p.colors || []).join(', ');
    document.getElementById('form-title').textContent = 'Редактировать товар';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteProduct(id) {
    if (!confirm('Удалить этот товар?')) return;
    const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) loadProducts();
}

function resetForm() {
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    document.getElementById('form-title').textContent = 'Добавить товар';
    document.getElementById('photo-error').textContent = '';
    document.getElementById('video-error').textContent = '';
}