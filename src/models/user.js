class User {
    constructor(user_id, username, email, password, img_uri = null
    ){
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.img_uri = img_uri;
    }
}

module.exports =  { User } ;