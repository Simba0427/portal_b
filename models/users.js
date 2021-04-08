const {connection} = require("../config");
const jwt = require('jsonwebtoken');
const moment = require("moment");

module.exports = {
    createUsers:(userObj) => {
        return connection.table("users").insert(userObj);
    },
    getUserByEmail:(email = "")=>{
        return connection.table("users").where("email", email).first();
    },
    LoggedIn:async(cred) => {
        let user = await connection.table("users")
        .where("email", cred.email)
        .select("*")
        .first();

        if( user === undefined ) {
            return {state: false, msg: "incorrect credentials"};
        } else {
            if ( user.password === cred.password ) {
                let dataUser = {
                    user_id: user.user_id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    phone: user.phone,
                    email: user.email,
                    locations: user.locations,
                    location_id: user.location_id,
                    user_role: user.user_role,
                    date: moment().format("YYYYMMDD hh:mm:ss")
                };

                let token =  jwt.sign(dataUser,process.env.TOKEN_SECRET);

                dataUser.token = token;

                return {state: true, msg: "success login", user: dataUser};

            } else {
                return {state: false, msg: "incorrect credentials."};    
            }
        }
    },
    getUsers:(data) => {
        if (data.officeId) {
            return connection.table("users").where("user_role", "user").where("location_id", data.officeId).select("*");
        }
        return connection.table("users").where("user_role", "user").select("*");
    },
    getUserById:(id) => {
        return connection.table("users").where("user_id", id).select("*");
    },
    updateUser:(userObj) => {
        return connection.table("users").where("user_id", userObj.user_id).update(userObj);
    },
    resetPassword:async(userObj) => {
        let user = await connection.table("users")
        .where("user_id", userObj.user_id)
        .select("*")
        .first();

        let updatedUserObj = {
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: userObj.newPwd,
            user_role: user.user_role,
            phone: user.phone,
            created_at: user.created_at
        }

        if (user.password === userObj.oldPwd) {
            result = await connection.table("users").where("user_id", userObj.user_id).update(updatedUserObj);
            return {state: true, msg: "success updated"};
        } else {
            return {state: false, msg: "incorrect your old password."};
        }
    },
    recoverPassword:async(userObj) => {
        let user = await connection.table("users")
        .where("email", userObj.email)
        .select("*")
        .first();

        let updatedUserObj = {
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: userObj.newPwd,
            user_role: user.user_role,
            phone: user.phone,
            created_at: user.created_at
        }
        let result = await connection.table("users").where("email", userObj.email).update(updatedUserObj);
        if (result) {
            return {state: true, msg: "success updated"};
        } else {
            return {state: false, msg: "incorrect your old password."};
        }
    },
    deleteUser:(id) => {
        return connection.table("users").where("user_id", id).delete();
    },
}