const { Router } = require ('express');
const router = Router();
const ctrl = require('../controller/initial.controller');

router.get('/', ctrl.getCollection);


module.exports = router;