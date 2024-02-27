
const CryptoJS = require("crypto-js");

const hashPassword = (password) => {
    const hashing_password = CryptoJS.SHA256(password, 'secret_key').toString();
    return hashing_password;
}

module.exports = hashPassword