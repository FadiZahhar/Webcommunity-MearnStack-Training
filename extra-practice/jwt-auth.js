/*
JWT, also known as JSON Web Token, is a method to securely transfer 
data between parties (like client and API), often used for authorization
JWT has steps to consider:

  1) create a [payload]: it is the data you wanna include in token
  2) create the config variable ['jwtSecret'] in default.json (value: "secret")
  3) [sign] the JWT: use the payload with the jwtSecret for it, and
     specify options as you want such as an expiry time in seconds for the token
     ex: jwt.sign(..., { expiresIn: 3600 }); token expires in 1 hour
  
  4) add a callback to handle errors and manipulate the token when done
     ex: sending the token to the client for authentication
*/

const jwt = require('jsonwebtoken');
const config = require('config');

let user = {
  id: 1,
  name: "Someone",
  email: "someone@anymail.com",
  password: "12345678",
};

// Step #1
let payload = {
  user: {
    id: user.id,
  },
};

// Step #2 is set in /config/default.json

// Step #3#4
jwt.sign(payload, config.get("jwtSecret"), {
  expiresIn: 86400, // 1 day
}, (err, token) => {
  if(err) throw "something went wrong";

  console.log(token);
});

/*
final result: 
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNjg4NjU4NjU3LCJleHAiOjE2ODg3NDUwNTd9.sK7BIGoSc1HQZ0diZnwTmPu3R9WZc8VfrhCfUpx0gpM
*/