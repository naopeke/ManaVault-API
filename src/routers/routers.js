const { Router } = require ('express');
const router = Router();
const ctrl = require('../controller/initial.controller');
const userCtrl = require('../controller/user.controller');



router.get('/', ctrl.getCollection);
router.get('/:user_id', userCtrl.getUser);


module.exports = router;