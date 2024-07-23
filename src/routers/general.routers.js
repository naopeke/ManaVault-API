//http://localhost:3000/cards?cardName=Aust+Com

const { Router } = require ('express');
const router = Router();
const userCtrl = require('../controller/user.controller');
const cardCtrl = require('../controller/card.controller');
const verifyToken = require('../middleware/jwtMiddleware');

router.post('/register', userCtrl.registerUser);
router.get('/users/:user_id', userCtrl.getUser);
router.post('/login', userCtrl.loginUser);
router.get('/protected', verifyToken, userCtrl.protectedRouter);
router.post('/users/:user_id', userCtrl.updateUser);
router.delete('/users/:user_id', userCtrl.deleteUser);

router.get('/cards', cardCtrl.fetchCardData);
router.get('/cards/symbols', cardCtrl.fetchCardSymbolsData);


module.exports = router;