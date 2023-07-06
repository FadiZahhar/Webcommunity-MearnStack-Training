// start by importing bcrypt library
const bcrypt = require("bcryptjs");

const encryptPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const encrypted = await bcrypt.hash(password, salt);

  return encrypted;
};

// compare unhashed password with hashed one
const passMatch = (password, hashedPass) => {
  return bcrypt.compareSync(password, hashedPass);
}


let password = "SomeOne123@_!";
let hashedPass = encryptPass(password)
  .then((data) => {
    console.log({ hashedPass: data }); 
    hashedPass = data;
    
    console.log(passMatch(password, hashedPass));
    console.log(passMatch("hello", hashedPass));
  }).catch((err) => console.error(err));
