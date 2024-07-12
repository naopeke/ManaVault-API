 class User {
    constructor(userId,email,password, username, photoURL
    ){
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.username = username;
        this.photoURL = photoURL;
    }

    // hash password
    async hashPassword (saltRounds){
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    // verify password
    async verifyPassword (inputPassword){
        return await bcrypt.compare(inputPassword, this.password);
    }
}

module.exports = { User }