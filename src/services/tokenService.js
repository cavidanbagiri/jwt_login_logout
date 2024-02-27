
const JWT = require('jsonwebtoken');
const { TokenModels } = require('../../models');

class TokenService {

    // Generate Token
    static generateToken(user_data) {
        const access_token = JWT.sign(user_data, 'access_token', { expiresIn: '30m' });
        const refresh_token = JWT.sign(user_data, 'refresh_token', { expiresIn: '60d' });
        return { access_token, refresh_token };
    }

    // Save Token
    static async saveToken(user_id, refresh_token) {
        const find_token = await TokenModels.findOne({
            where: {
                user_id: user_id
            }
        })
        if (!find_token) {
            const token = await TokenModels.create({
                user_id: user_id,
                refresh_token: refresh_token
            });
            return token;
        }
        else {
            find_token.refresh_token = refresh_token;
            await find_token.save();
            return find_token;
        }
    }

    static async deleteToken(refresh_token) {
        const token_data = await TokenModels.destroy({
            where: {
                refresh_token: refresh_token
            }
        });
        return token_data;
    }

    // Validate Access Token
    static async validateAccessToken(token) {
        try {
            const user_data = JWT.verify(token, process.env.JWT_ACCESS_TOKEN);
            return user_data;
        }
        catch (err) {
            return null;
        }
    }

    // Validate Refresh Token
    static validateRefreshToken(token) {
        try {
            const user_data = JWT.verify(token, process.env.JWT_REFRESH_TOKEN);
            return user_data;
        }
        catch (err) {
            return null;
        }
    }



}


module.exports = TokenService;