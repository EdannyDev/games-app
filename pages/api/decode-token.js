import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  // Verifica que el método sea POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Obtén el token del cuerpo de la solicitud
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    // Decodifica el token sin verificar
    const decoded = jwt.decode(token);
    res.status(200).json({ decoded });
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
}