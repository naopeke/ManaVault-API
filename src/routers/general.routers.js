const { Router } = require ('express');
const router = Router();
const userCtrl = require('../controller/user.controller');

router.post('/register', userCtrl.registerUser);
router.get('/:uid', userCtrl.getUser);
router.get('/login', userCtrl.loginUser);
router.post('/profile/:uid', userCtrl.updateUser);
router.delete('/profile/:uid', userCtrl.deleteUser);


module.exports = router;