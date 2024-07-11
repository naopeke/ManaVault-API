const { pool } = require('../database');
const bcrypt = require('bcrypt');
const { User } = require('../models/user')


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {

      //hash password
      const saltRounds = 10;
      const user = new User(null, email, password, username, null);
      await user.hashPassword(saltRounds);

      const sql = 'INSERT INTO manavault.users (username, email, password) VALUES ($1, $2, $3) RETURNING userId';
      const values = [user.username, user.email, user.password];
      const result = await pool.query(sql, values);
     
      user.userId = result.rows[0].userId;
      console.log('Successfully created new user ID:', user.userId);
      res.status(201).send(user);

    } catch (error) {
      console.log('Error creating new user:', error);
      res.status(400).send(error);
    }
  };


  const getUser = async (req, res) => {
    const { user_id } = req.params;

    console.log('Recieved user_id', user_id);

    try {

      // doesn't choose password for security
      const sql = 'SELECT user_id, photoURL, username, email FROM manavault.users WHERE user_id = $1';
      const values = [user_id];
      const result = await pool.query(sql, values);

      console.log('Excuted SQL', sql, values);
      console.log('Query result', result.rows);

      if (result.rows.length > 0){
        const user = result.rows[0];
        console.log('Successfully fetched user data:', user);
        res.status(200).send(user);
      } else {
        res.status(404).send({ message:'User not found' });
      }
      
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

           const userInstance = new User(user.userId, user.email, user.password, user.username, user.photoURL);

           //password
           const isValidPassword = await userInstance.verifyPassword(password);
           if (!isValidPassword){
            return res.status(401).send({message: 'Authentication failed'});
           }

           const userRecord = {
            userId: userInstance.userId,
            username: userInstance.username,
            email: userInstance.email
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
    const { userId } = req.params;
    const { email, username, photoURL } = req.body;

    try {
      const sql = 'UPDATE manavault.user SET email = $1, username = $2, photoURL = $3 WHERE userId = $4 RETURNING *';
      const values = [userId, email, username, photoURL]
      const result = await pool.query(sql, values);

      if (result.rows.length > 0){
        const userRecord = result.rows[0];
        console.log('Successfully updated user', userRecord);
        res.status(200).send(userRecord);
      }

    } catch (error) {
      console.log('Error updating user:', error);
      res.status(400).send(error);
    }
  };


  const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
      const sql = 'DELETE FROM manavault.user WHERE userId = $1';
      const values = [userId];
      await pool.query(sql, values);
      console.log('Successfully deleted user', values);
      res.status(200).send(`Successfully deleted user with UID: ${userId}`);
      
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