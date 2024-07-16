require('dotenv').config();
const jwt = require('jsonwebtoken');
// const secretKey = process.env.JWT_SECRET_KEY
const config = require('../middleware/config');



function verifyToken(req, res, next){
    const token = req.headers['authorization'];

    if (!token){
        return res.status(401).json({message: 'No token provided'});
    }

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Failed to authenticate token' });
        }
    
        req.user_id = decoded.user_id;
        console.log('Token authenticated successfully');
        next();
      });
}

module.exports = verifyToken;