const { Router } = require ('express');
const router = Router();
const { db } = require ('../firebase');

router.get('/', async (req, res) => {
    const querySnapshot = await db.collection('users').get();
    console.log(querySnapshot.docs);
    res.send('API DESPLEGADA');
});

module.exports = router;