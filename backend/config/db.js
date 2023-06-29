const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    // cleaner code
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB Connected...');
    }
    catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}


    /*
    not a clean code
    mongoose.connect(db,{
        useNewUrlParser:true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error(err.message);
        process.exit(1);
    });
    
};*/


/*

Here's what each part does:

const connectDB = async () => {...}: 
This defines an asynchronous function named connectDB. 
Asynchronous functions are functions that return a Promise. This function can be used with the await keyword.

try {...}: This is the start of a try-catch block. 
The code inside the try block is executed, and if an error occurs, 
the execution of the try block is stopped, and control is passed to the catch block.

await mongoose.connect(db,{...});: 
This line attempts to establish a connection to a MongoDB database using the Mongoose library. 
The await keyword is used to wait for the Promise returned by mongoose.connect() 
to either resolve (if the connection was successful) or reject (if there was an error). 
The db variable likely contains a string representing the URL of your MongoDB instance.

useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false: 
These are options passed to mongoose.connect(). 
useNewUrlParser and useCreateIndex are recommended to avoid deprecation warnings in Mongoose. 
useFindAndModify is set to false to make Mongoose's findOneAndUpdate() and findOneAndDelete() 
use native MongoDB's findAndModify() function.

console.log('MongoDB Connected...');: 
This line logs a success message to the console if the database connection was established successfully.

catch(err) {...}: This block catches any errors that occurred in the try block. 
The err object contains information about the error.

console.error(err.message);: This line logs the error message to the console. 
console.error() is similar to console.log(), but it outputs messages to stderr instead of stdout, 
and it can be helpful for differentiating regular output from error messages.

process.exit(1);: This line ends the process with a 'failure' code (1) if there was an error. 
By convention, a code of 0 means that the program ended successfully, and any other code indicates an error. 
This is useful when your program is used in scripting or automation, 
as it signals to the calling script or tool that something went wrong.

In summary, this function is used to connect to a MongoDB database using Mongoose, 
and it will log an appropriate message to the console whether the connection was successful or an error occurred.

*/

module.exports = connectDB;