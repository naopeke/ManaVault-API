const { pool } = require('../database');
const bcrypt = require('bcrypt');


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {

      //hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const sql = 'INSERT INTO manavault.user (username, email, password) VALUES ($1, $2, $3) RETURNING uid';
      const values = [username, email, hashedPassword];
      const result = await pool.query(sql, values);
     
      console.log('Successfully created new user ID:', result.rows[0].uid);
      const userRecord = {id: result.rows[0].uid, username, email};
      res.status(201).send(userRecord);
    } catch (error) {
      console.log('Error creating new user:', error);
      res.status(400).send(error);
    }
  };

  const getUser = async (req, res) => {
    const { uid } = req.params;
    try {
      const sql = 'SELECT * FROM manavault.user WHERE manavault.uid = $1';
      const values = [uid];
      const result = await pool.query(sql, values);

      console.log('Successfully fetched user data:', result);
      res.status(200).send(result);
      
    } catch (error) {
      console.log('Error fetching user data:', error);
      res.status(400).send(error);
    }
  };

  const loginUser = async(req, res) =>{
    const { email, password } = req.body;    

    try {
        const sql = 'SELECT * FROM manavault.user WHERE email = $1';
        const values = [email];
        const result = await pool.query(sql, values);

        if(result.rows.length > 0) {
           const user = result.rows[0];

           //password
           const isValidPassword = await bcrypt.compare(password, user.password);
           if (!isValidPassword){
            return res.status(401).send({message: 'Authentication failed'});
           }

           const userRecord = {
            uid: user.uid,
            username: user.username,
            email: user.email
           }
          res.status(200).send({ userRecord, message: 'User authenticated successfully' });
        } else {
          res.status(401).send({ message: 'Authentication failed' });
        }
      } catch (err) {
        console.error('Error:', err);
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



module.exports = {
    registerUser,
    getUser,
    loginUser,
    updateUser,
    deleteUser
}