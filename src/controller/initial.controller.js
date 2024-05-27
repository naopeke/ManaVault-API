const { db } = require('../firebase');

const getCollection = async (req, res) => {
    const result = await db.collection('users').get();
    // console.log(result.docs[0].data());

    const users = result.docs.map(doc =>({
        id: doc.id,
        ...doc.data()
    }))

    console.log(users);
    res.send('API DESPLEGADA');
}

module.exports = {
    getCollection
};