const { pool } = require('../database');
const admin = require('../firebase');

// Firebase


const registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const userRecord = await admin.auth().createUser({
        email: email,
        password: password,
      });
      console.log('Successfully created new user:', userRecord.uid);
      res.status(201).send(userRecord);
    } catch (error) {
      console.log('Error creating new user:', error);
      res.status(400).send(error);
    }
  };

  const getUser = async (req, res) => {
    const { uid } = req.params;
    try {
      const userRecord = await admin.auth().getUser(uid);
      console.log('Successfully fetched user data:', userRecord.toJSON());
      res.status(200).send(userRecord);
      
    } catch (error) {
      console.log('Error fetching user data:', error);
      res.status(400).send(error);
    }
  };

  const loginUser = async(req, res) =>{
    const { idToken } = req.body;    
    console.log('logged in');

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        console.log('User ID:', uid);
        res.status(200).send({ uid, message: 'User authenticated successfully' });
      } catch (error) {
        console.error('Error verifying ID token:', error);
        res.status(401).send({ message: 'Authentication failed' });
      }
  }

  const updateUser = async (req, res) => {
    const { uid } = req.params;
    const updateData = req.body;

    try {
      const userRecord = await admin.auth().updateUser(uid, updateData);
      console.log('Successfully updated user', userRecord.toJSON());
      res.status(200).send(userRecord);

    } catch (error) {
      console.log('Error updating user:', error);
      res.status(400).send(error);
    }
  };

  const deleteUser = async (req, res) => {
    const { uid } = req.params;
    try {
      await admin.auth().deleteUser(uid);
      console.log('Successfully deleted user');
      res.status(200).send(`Successfully deleted user with UID: ${uid}`);
    } catch (error) {
      console.log('Error deleting user:', error);
      res.status(400).send(error);
    }
  };


  

// Propio BBSS


// const registerUser = async(req, res, next) => {
//     const { name, email, password } = req.body;
//     console.log(name, email, password);
//     db.collection('users').add({
//         username,
//         email,
//         password
//     })
//     res.send('registered');
// }

// const loginUser = async(req, res, next) => {
//     console.log('login');
// }

// const editUser = async(req, res, next) => {
//     console.log('edited');

//     const doc = await db.collection('users').doc(req.params.id).get();

//     console.log({
//         id: doc.id,
//         ...doc.data()
//     })

// }

// const updateUser = async(req, res, next) => {
//     console.log('updated');

//     const { id } = req.params;
//     await db.collection('users').doc(id).update(req.body);

//     console.log({
//         id: doc.id,
//         ...doc.data()
//     })


module.exports = {
    registerUser,
    getUser,
    loginUser,
    updateUser,
    deleteUser
}