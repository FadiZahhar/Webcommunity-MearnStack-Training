// this package is used to operate and connect mongo databases
const mongoose = require("../backend/mongoose");

// config will read the default.json file in project 
// and get the corresponding data for that property
const DB_URL = require("config").get("mongoURI");


// this function is made asynchronous in order to preserver performance (bg task)
// it's responsible for connecting to mongo database 
const db_mongo_connect = async () => {
  try{
    mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("Connected to mongo DB...");
  }catch(err){
    console.log("Failed to connect mongo DB.");
    console.error(err);
  }
}
module.exports = db_mongo_connect;
/* 
in connection options:
  -> useNewUrlParser & useUnifiedTopology help avoid deprecation warnings
  -> useFindAndModify is set to false to make Mongoose's findOneAndUpdate() and findOneAndDelete() 
     use native MongoDB's findAndModify() function.
*/