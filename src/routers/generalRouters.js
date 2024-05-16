const { Router } = require ('express');
const router = Router();
const generalCtrl = require('../controller/general.controller');

router.post('/register', generalCtrol.registerUser);
router.post('/login', generalCtrol.loginUser);

module.exports = router;