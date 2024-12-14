const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const isAdmin = async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const user = await User.findById(req.user._id);
    if (user && user.role === 'administrador') {
      next();
    } else {
      res.status(403).json({ message: 'Admin access required' });
    }
  } catch (error) {
    console.error('Error al verificar el rol del usuario:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { verifyToken, isAdmin };