require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const token = req.headers['authorization'];

    if (!token){
        return res.status(401).json({message: 'No token provided'});
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Failed to authenticate token' });
        }
    
        req.user_id = decoded.user_id;
        next();
      });
}

module.exports = verifyToken;