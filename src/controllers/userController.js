const tryCatch = require('../utils/tryCatch');

const { RegisterUser, LoginUser, FetchUsers, RefreshToken, LogoutUser } = require("../services/userService");

class UserController {

    // User Register Function
    static async registeruser(req, res, next) {
        const { username, email, password } = req.body;
        const user = new RegisterUser(username, email, password);
        await tryCatch(
            await user.registerUser()
                .then((respond) => {
                    res.cookie('refreshToken', respond.refresh, { maxAge:  60 * 24 * 60 * 60 * 1000, httpOnly: true });
                    return res.status(201).json(respond);
                }).catch((err) => {
                    next(err);
                })
        )
    }

    // User Login
    static async userLogin(req, res, next) {
        const user_data = {
            email: req.body.email,
            password: req.body.password
        }
        tryCatch(
            LoginUser.userLogin(user_data)
                .then((respond) => {
                    res.cookie('refreshToken', respond.refresh, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });
                    return res.status(200).json(respond);
                }).catch(err => {
                    next(err);
                })
        );
    }

    // User Logout
    static async userLogout(req, res, next) {
        const { refreshToken } = req.cookies;
        const token = LogoutUser.userLogout(refreshToken);
        res.clearCookie('refreshToken');
        return res.send(token);
    }


    // fetching
    static async fetchingSome(req, res, next) {
        const data = [
            {id:1, name:'Apple'},
            {id:2, name:'Granate'},
            {id:3, name:'Banana'},
            {id:4, name:'Pine Apple'},
            {id:5, name:'Tomate'},
            {id:6, name:'Potate'},
        ];
        console.log('data is : ', data);
        return res.status(200).json(data);
    }

    // Refresh Token
    static async refresh(req, res, next) {
        // const { refreshToken } = req.cookies; -- This Is For Web Developement, VUE Js
        const refreshToken = req.headers.refreshtoken;
        const user_data = await RefreshToken.refresh(refreshToken);
        res.cookie('refreshToken', user_data.refresh, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.status(200).send(user_data);
    }

    // fetch All Users
    static async fetchUsers(req, res, next) {
        await tryCatch(
            await FetchUsers.fetchUsers()
                .then((respond) => {
                    return res.json(respond)
                }).catch((err) => {
                    next(err);
                })
        )
    }


}

module.exports = UserController;