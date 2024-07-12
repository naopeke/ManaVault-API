

//   const updateUser = async (req, res) => {
//     const { userId } = req.params;
//     const { email, username, photoURL } = req.body;

//     try {
//       const sql = 'UPDATE manavault.user SET email = $1, username = $2, photoURL = $3 WHERE userId = $4 RETURNING *';
//       const values = [userId, email, username, photoURL]
//       const result = await pool.query(sql, values);

//       if (result.rows.length > 0){
//         const userRecord = result.rows[0];
//         console.log('Successfully updated user', userRecord);
//         res.status(200).send(userRecord);
//       }

//     } catch (error) {
//       console.log('Error updating user:', error);
//       res.status(400).send(error);
//     }
//   };


//   const deleteUser = async (req, res) => {
//     const { userId } = req.params;

//     try {
//       const sql = 'DELETE FROM manavault.user WHERE userId = $1';
//       const values = [userId];
//       await pool.query(sql, values);
//       console.log('Successfully deleted user', values);
//       res.status(200).send(`Successfully deleted user with UID: ${userId}`);
      
//     } catch (error) {
//       console.log('Error deleting user:', error);
//       res.status(400).send(error);
//     }
//   };



const { client } = require('../database');
const { User } = require('../models/user')


// get userRecord
const getUser = async (req, res) => {
  const { user_id } = req.params;

  console.log('Recieved user_id', user_id);

  try {

    // doesn't choose password for security
    const sql = 'SELECT * FROM manavault.users WHERE user_id = $1';
    const values = [user_id];
    const result = await client.query(sql, values);

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


//register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User(null, email, password, username, null);
    const sql = 'INSERT INTO manavault.users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id';
    const values = [user.username, user.email, user.password];
    const result = await client.query(sql, values);
    
    user.userId = result.rows[0].userId;
    console.log('Successfully created new user ID:', user.userId);
    res.status(201).send(user);

  } catch (error) {
    console.log('Error creating new user:', error);
    res.status(400).send(error);
  }
};


//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const sql = 'SELECT * FROM manavault.users WHERE email = $1';
    const values = [email];
    const result = await client.query(sql, values);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      //compare password
      if (password === user.password) {
        const userInstance = new User(user.userId, user.email, user.password, user.username, user.photoURL);

        const userRecord = {
          userId: userInstance.userId,
          username: userInstance.username,
          email: userInstance.email
        }

        res.status(200).send({ userRecord, message: 'User authenticated successfully' });
      } else {
        //when the password doesn't match
        res.status(401).send({ message: 'Authentication failed' });
      }
    } else {
      //cannot find the user
      res.status(401).send({ message: 'Authentication failed' });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(401).send({ message: 'Authentication failed' });
  }
}


//edit userRecord
const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { email, username, img_uri } = req.body;

  // try {
  //   const sql = 'UPDATE manavault.users SET email = $1, username = $2, img_uri = $3 WHERE user_id = $4 RETURNING *';
  //   const values = [email, username, img_uri, user_id];
  //   const result = await client.query(sql, values);

  //   if (result.rows.length > 0){
  //     const userRecord = result.rows[0];
  //     console.log('Successfully updated user', userRecord);
  //     res.status(200).send(userRecord);
  //   }

  // } catch (error) {
  //   console.log('Error updating user:', error);
  //   res.status(400).send(error);
  // }

  try {
  let sql = 'UPDATE manavault.users SET';
  let values = [];
  let index = 1;

  if (email){
    sql += ` email = $${index},`;
    values.push(email);
    index++;
  }

  if (username){
    sql += ` username = $${index},`;
    values.push(username);
    index++;
  }

  if (img_uri){
    sql += ` img_uri = $${index},`;
    values.push(img_uri);
    index++;
  }

  sql = sql.slice(0, -1); //delete the last ',' and space
  sql += ` WHERE user_id = $${index} RETURNING *`;
  values.push(user_id);

  const result = await client.query(sql, values);

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


  module.exports = {
    getUser,
    registerUser,
    loginUser,
    updateUser,
  }