
const UserError = require( "../exceptions/userExceptions");
const TokenService = require( "../services/tokenService");


const authMiddleware = async (req, res, next) => {
  try{
    const access_token = req.headers.authorization;
    console.log('access toek is : ', access_token);
    if(!access_token){
      return next(UserError.UnauthorizedError());
    }
    
    const token = access_token.split(' ')[1];
    if(!token){
      return next(UserError.UnauthorizedError());
    }
    const user_data = await TokenService.validateAccessToken(token);
    console.log('after validate : ', user_data);
    if(!user_data){
      return next(UserError.UnauthorizedError());
    }
    req.user = user_data;
    next();

  }
  catch(err){
    return next (UserError.UnauthorizedError());
  }

} 


module.exports = authMiddleware;

