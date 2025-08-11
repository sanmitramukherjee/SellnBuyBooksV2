// // backend/middleware/auth.js
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// module.exports = function (req, res, next) {
//   const authHeader = req.headers['authorization'];
//   if (!authHeader) {
//     console.warn('No Authorization header');
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   const parts = authHeader.split(' ');
//   if (parts.length !== 2 || parts[0] !== 'Bearer') {
//     console.warn('Malformed Authorization header:', authHeader);
//     return res.status(401).json({ error: 'Malformed token' });
//   }

//   const token = parts[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // Normalize payload to req.user
//     req.user = {
//       id: decoded.id || decoded._id,
//       username: decoded.username || decoded.name,
//       email: decoded.email
//     };
//     return next();
//   } catch (err) {
//     console.error('JWT verify failed:', err.message);
//     return res.status(403).json({ error: 'Invalid or expired token' });
//   }
// };

// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    console.warn('No Authorization header');
    return res.status(401).json({ error: 'No token provided' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    console.warn('Malformed Authorization header:', authHeader);
    return res.status(401).json({ error: 'Malformed token' });
  }

  const token = parts[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach both id and other fields from the token payload
    req.user = {
      id: decoded.id || decoded._id,
      username: decoded.username || decoded.name || null,
      email: decoded.email || null
    };

    // For backward compatibility if some routes use req.userId
    req.userId = req.user.id;

    return next();
  } catch (err) {
    console.error('JWT verify failed:', err.message);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

