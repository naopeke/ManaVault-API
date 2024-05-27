const { pool } = require('../database');

// Firebase


// Propio BBSS


const registerUser = async(req, res, next) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    console.log('register');
}

const loginUser = async(req, res, next) => {
    console.log('login');
}

module.exports = {
    registerUser,
    loginUser
}