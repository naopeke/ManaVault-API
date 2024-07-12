class User {
    constructor(user_id,email,password, username, photoURL
    ){
        this.user_id = user_id;
        this.email = email;
        this.password = password;
        this.username = username;
        this.img_uri = img_uri;
    }
}

module.exports = { User }