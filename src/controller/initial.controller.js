const { db } = require('../firebase');

const getCollection = async (req, res) => {
    const result = await db.collection('users').get();
    console.log(result);
    // console.log(result.docs[0].data());
    res.send('API DESPLEGADA');
}

module.exports = {
    getCollection
};