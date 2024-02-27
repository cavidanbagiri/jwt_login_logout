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
                    res.cookie('refreshToken', respond.refresh, { maxAge: '30m', httpOnly: true });
                    return res.status(200).send(respond);
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
                    return res.status(200).send(respond);
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


    // Refresh Token
    static async refresh(req, res, next) {
        const { refreshToken } = req.cookies;
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