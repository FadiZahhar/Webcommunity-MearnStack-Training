// start by importing bcrypt library
const bcrypt = require("bcryptjs");

const encryptPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const encrypted = await bcrypt.hash(password, salt);

  return encrypted;
};

let password = "SomeOne123@_!";
let hashedPass = encryptPass(password)
  .then((data) => {
    console.log({ hashedPass: data }); 
    hashedPass = data;
  }).catch((err) => console.error(err));
