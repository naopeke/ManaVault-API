const { Router } = require ('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('API DESPLEGADA');
});

module.exports = router;