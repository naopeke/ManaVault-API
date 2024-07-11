const { Router } = require ('express');
const router = Router();

const intCtrl = require('../controller/initial.controller');

//deploy message of root path
router.get('/', intCtrl.deployMessage);