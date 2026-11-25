const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_medmoda_2026'; 

// ПАРОЛЬ ИЗМЕНЕН НА islom2011
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('islom2011', 10);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const productsFile = path.join(dataDir, 'products.json');
if (!fs.existsSync(productsFile)) fs.writeFileSync(productsFile, '[]');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedImages = ['image/jpeg', 'image/png', 'image/webp'];
    const allowedVideos = ['video/mp4', 'video/webm'];
    
    if (file.fieldname === 'photos' && allowedImages.includes(file.mimetype)) {
        cb(null, true);
    } else if (file.fieldname === 'videos' && allowedVideos.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Неверный формат файла. Разрешены: JPEG, PNG, WebP для фото и MP4, WebM для видео.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Нет доступа' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Неверный токен' });
        req.user = user;
        next();
    });
};

// --- API АВТОРИЗАЦИЯ ---
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (!password) return res.status(400).json({ error: 'Введите пароль' });
    
    if (bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
        const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Неверный пароль' });
    }
});

// --- API ТОВАРЫ ---
app.get('/api/products', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
    res.json(products);
});

app.post('/api/products', authenticateToken, upload.fields([{ name: 'photos', maxCount: 6 }, { name: 'videos', maxCount: 2 }]), (req, res) => {
    try {
        const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
        const photos = req.files['photos'] ? req.files['photos'].map(f => `/uploads/${f.filename}`) : [];
        const videos = req.files['videos'] ? req.files['videos'].map(f => `/uploads/${f.filename}`) : [];
        
        const newProduct = {
            id: Date.now().toString(),
            name: req.body.name,
            price: parseInt(req.body.price),
            description: req.body.description || '',
            category: req.body.category || 'robe',
            gender: req.body.gender || 'unisex',
            sizes: req.body.sizes ? JSON.parse(req.body.sizes) : {},
            colors: req.body.colors ? JSON.parse(req.body.colors) : [],
            photos: photos,
            videos: videos
        };
        
        products.push(newProduct);
        fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/products/:id', authenticateToken, upload.fields([{ name: 'photos', maxCount: 6 }, { name: 'videos', maxCount: 2 }]), (req, res) => {
    try {
        const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
        const index = products.findIndex(p => p.id === req.params.id);
        if (index === -1) return res.status(404).json({ error: 'Товар не найден' });
        
        const oldProduct = products[index];
        const newPhotos = req.files['photos'] ? req.files['photos'].map(f => `/uploads/${f.filename}`) : [];
        const newVideos = req.files['videos'] ? req.files['videos'].map(f => `/uploads/${f.filename}`) : [];
        
        const updatedProduct = {
            ...oldProduct,
            name: req.body.name || oldProduct.name,
            price: parseInt(req.body.price) || oldProduct.price,
            description: req.body.description || oldProduct.description,
            category: req.body.category || oldProduct.category,
            gender: req.body.gender || oldProduct.gender,
            sizes: req.body.sizes ? JSON.parse(req.body.sizes) : oldProduct.sizes,
            colors: req.body.colors ? JSON.parse(req.body.colors) : oldProduct.colors,
            photos: newPhotos.length > 0 ? newPhotos : oldProduct.photos,
            videos: newVideos.length > 0 ? newVideos : oldProduct.videos
        };
        
        products[index] = updatedProduct;
        fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/products/:id', authenticateToken, (req, res) => {
    try {
        let products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
        products = products.filter(p => p.id !== req.params.id);
        fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
        res.json({ message: 'Товар удален' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Защита от несуществующих API маршрутов (чтобы фронтенд не ломался)
app.use('/api', (req, res) => {
    res.status(404).json({ error: 'API маршрут не найден' });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});