/*
this middleware will use the JWT token to authenticate user logins
to be able to use it properly, you need to create it following the steps:

  1) retrieve the token from request.headers as 'x-auth-token'
  2) check if a token was provided, send code 401 (unauthorized) if not provided
  3) handle errors to avoid token verification problems
  4) decode the token  provided alongside the jwtSecret with jwt.verify()
  
  5) use the decoded variable and attach the user info to the request object
     so it becomes accessible to subsequent middlewares and route handlers.

  6) pass control to the next middleware or route handler. 
     this is a standard in express.
*/
const jwt = require('jsonwebtoken');
const config = require('config');

const Authorize = (req, response, next) => {
  // #1
  let token = req.header('x-auth-token');
  
  // #2
  if(!token) response.status(401).json({ msg: "invalid token" });

  // #3
  try{
    // #4
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    
    // #5
    req.user = decoded.user;

    // #6 
    next();
  }catch(err){
    console.log("🚀 ~ file: auth.js:41 ~ Authorize ~ err:", err.message);
    response.status(401).json({ msg: "Unauthorized!" });
  }
}

module.exports = Authorize;