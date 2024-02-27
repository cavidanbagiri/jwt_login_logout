
const { UserModels } = require('../../models');
const { Op } = require("sequelize");
const hashPassword = require('../helpers/hashPassword');
const UserError = require('../exceptions/userExceptions');
const TokenService = require('./tokenService');

class RegisterUser {

    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = hashPassword(password);
    }

    async registerUser() {
        const finding_user = await this.#findUser();
        if (!finding_user) {
            // Create New User In Database
            const new_user = await UserModels.create({
                username: this.username,
                email: this.email,
                password: this.password,
            });
            // Take Access Token and Resfresh Token For New User
            const { access_token, refresh_token } = this.#generateToken(new_user);
            // Save New User and Refresh Token In Token Models
            await TokenService.saveToken(new_user.id, refresh_token);

            return {
                user: new_user,
                access_token: access_token,
                refresh_token: refresh_token
            }
        }
        else {
            throw UserError.UserAlreadyRegisterError(500, 'This Email Or Username is active');
        }
    }

    // Find User
    async #findUser() {
        const user = await UserModels.findOne({
            where: {
                [Op.or]: [{ email: this.email }, { username: this.username }]
            }
        });
        return user;
    }

    // Generate Token For Register User
    #generateToken(user_data) {
        const user = {
            id: user_data.id,
            email: user_data.email,
            username: user_data.user_name
        };
        const { access_token, refresh_token } = TokenService.generateToken(user);
        console.log('1 : ', access_token);
        console.log('2 : ', refresh_token);
        return { access_token, refresh_token };
    }

}

class LoginUser {

    // User Login
    static async userLogin(user_data) {

        const find_user = await this.#findUser(user_data.email, user_data.password);

        if (find_user) {
            const find_user_data = {
                id: find_user.id,
                email: find_user.email,
                is_admin: find_user.is_admin
            }
            const tokens = TokenService.generateToken(find_user_data);

            // Save Refresh Token To Database
            await TokenService.saveToken(find_user_data.id, tokens.refresh_token);

            return {
                access: tokens.access_token,
                refresh: tokens.refresh_token,
                user: find_user_data
            }

        }
        else {
            throw UserError.UserNotFoundError();
        }

    }

    // Find User
    static async #findUser(email, password) {

        const find_user = await UserModels.findOne({
            where: {
                email: email,
            }
        });

        if (find_user) {
            const hasing_password = hashPassword(password);
            if (find_user.password == hasing_password) {
                return find_user
            }
        }
        else {
            return null;
        }

    }

}

// User Logout
class LogoutUser {

    static async userLogout(refresh_token) {
        const token = await TokenService.deleteToken(refresh_token);
        return token;
    }

}

// Refresh Token
class RefreshToken {

    static async refresh(refresh_token) {
        if (!refresh_token) {
            throw UserError.UnauthorizedError();
        }

        const user_data = TokenService.validateRefreshToken(refresh_token);
        const token_from_data = TokenService.findToken(refresh_token);

        if (!user_data || !token_from_data) {
            throw UserError.UnauthorizedError();
        }

        const find_user = await UserModels.findOne({
            where: {
                id: user_data.id
            }
        });

        const find_user_data = {
            id: find_user.id,
            email: find_user.email,
            is_admin: find_user.is_admin
        }
        const tokens = TokenService.generateToken(find_user_data);

        // Save Refresh Token To Database
        await TokenService.saveToken(find_user_data.id, tokens.refresh_token);

        return {
            access: tokens.access_token,
            refresh: tokens.refresh_token,
            user: find_user_data
        }

    }
}


class FetchUsers {
    static async fetchUsers() {
        const users = await UserModels.findAll();
        return users;
    }
}

module.exports = {
    RegisterUser,
    FetchUsers,
    LoginUser,
    LogoutUser,
    RefreshToken
};