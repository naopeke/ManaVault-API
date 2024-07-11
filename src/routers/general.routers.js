const { Router } = require ('express');
const router = Router();
const userCtrl = require('../controller/user.controller');

router.post('/register', userCtrl.registerUser);
router.get('/:user_id', userCtrl.getUser);
router.get('/login', userCtrl.loginUser);
router.post('/profile/:user_id', userCtrl.updateUser);
router.delete('/profile/:user_id', userCtrl.deleteUser);


module.exports = router;