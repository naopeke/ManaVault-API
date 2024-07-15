const { Router } = require ('express');
const router = Router();
const userCtrl = require('../controller/user.controller');
const verifyToken = require('../middleware/jwtMiddleware');

router.post('/register', userCtrl.registerUser);
router.get('/:user_id', userCtrl.getUser);
router.put('/login', userCtrl.loginUser);
router.get('/protected', verifyToken, userCtrl.protectedRouter);
router.post('/users/:user_id', userCtrl.updateUser);
router.delete('/users/:user_id', userCtrl.deleteUser);


module.exports = router;