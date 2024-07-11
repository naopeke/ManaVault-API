const { Router } = require ('express');
const router = Router();
const userCtrl = require('../controller/user.controller');
// const intCtrl = require('../controller/initial.controller');

// //deploy message of root path
// router.get('/', intCtrl.deployMessage);

//register
router.post('/register', userCtrl.registerUser);

//get userRecord
router.get('/:user_id', userCtrl.getUser);

//login
router.post('/login', userCtrl.loginUser);

//update profile
router.put('/users/:user_id', userCtrl.updateUser);

//delete profile
router.delete('/users/:user_id', userCtrl.deleteUser);


module.exports = router;