const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/games');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se almacenarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre único para cada archivo
  },
});

const upload = multer({ storage });

// Crear un nuevo producto (solo administradores)
router.post('/', verifyToken, isAdmin, upload.single('image'), async (req, res) => {
  const { title, genre, platform, price, description, releaseYear, developer } = req.body;
  const image = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : ''; // Genera la URL de la imagen

  const product = new Product({
    title,
    genre,
    platform,
    price,
    image,
    description,
    releaseYear,
    developer,
  });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar un producto (solo administradores)
router.put('/:id', verifyToken, isAdmin, upload.single('image'), async (req, res) => {
  const { title, genre, platform, price, description, releaseYear, developer } = req.body;
  const image = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '';

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.title = title || product.title;
    product.genre = genre || product.genre;
    product.platform = platform || product.platform;
    product.price = price || product.price;
    product.image = image || product.image;
    product.description = description || product.description;
    product.releaseYear = releaseYear || product.releaseYear;
    product.developer = developer || product.developer;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un producto (solo administradores)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener reseñas de un producto
router.get('/:id/reviews', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews.user', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product.reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Agregar una reseña a un producto
router.post('/:id/review', verifyToken, async (req, res) => {
  const { rating, comment } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Verifica si el usuario ya ha dejado una reseña para este producto
    const existingReview = product.reviews.find(review => review.user.toString() === userId.toString());
    if (existingReview) {
      return res.status(400).json({ message: 'Ya has dejado una reseña para este producto' });
    }

    const newReview = {
      user: userId,
      rating,
      comment,
    };

    product.reviews.push(newReview);
    await product.save();

    // Calcula el nuevo promedio de calificaciones y redondea a un decimal
    const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
    product.averageRating = Math.round(averageRating * 10) / 10; // Redondear a un decimal
    await product.save();

    // Incluye la información del usuario en las reseñas
    const populatedProduct = await Product.findById(req.params.id).populate('reviews.user', 'name');

    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar una reseña (solo el autor de la reseña o administrador)
router.put('/:id/review/:reviewId', verifyToken, async (req, res) => {
  const { rating, comment } = req.body;
  const { reviewId } = req.params;
  const userId = req.user._id;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const review = product.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    // Verifica si el usuario es el autor de la reseña o un administrador
    if (review.user.toString() !== userId.toString() && req.user.role !== 'administrador') {
      return res.status(403).json({ message: 'No tienes permisos para editar esta reseña' });
    }

    // Actualiza la reseña
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await product.save();

    // Poblar la información del usuario en las reseñas antes de enviar la respuesta
    const populatedProduct = await Product.findById(req.params.id)
      .populate('reviews.user', 'name');

    res.json(populatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar una reseña (solo el autor de la reseña o administrador)
router.delete('/:id/review/:reviewId', verifyToken, async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user._id;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const review = product.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    // Verifica si el usuario es el autor de la reseña o un administrador
    if (review.user.toString() !== userId.toString() && req.user.role !== 'administrador') {
      return res.status(403).json({ message: 'No tienes permisos para eliminar esta reseña' });
    }

    // Utiliza el método pull para eliminar la reseña del array
    product.reviews.pull(reviewId);

    // Recalcula el promedio de calificaciones
    product.averageRating = product.reviews.length
      ? Math.round(product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length * 10) / 10
      : 0;

    await product.save();

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;