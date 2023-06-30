
/* 
* This line imports the Express.js library, 
* which is a popular and lightweight web server framework 
* in Node.js.
*/
const express = require('express');
// adding the config db
const connectDB = require('./config/db');

/*
* Here, an instance of Express is created and assigned to the constant app. 
* This instance has methods for routing HTTP requests, 
* configuring middleware, rendering HTML views, and registering a template engine.
*/
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended:false}));


/*
* This line sets up a route handler for HTTP GET requests. 
* When the server receives a GET request at the root URL (/), 
* it responds by sending back the text 'Hello World'. 
* The req and res parameters represent the HTTP request and response objects, respectively.
*/
// remove this to check how you will get the info as html
//app.get('/',(req,res) => res.send('Hello World'));

// this will send a json messsage instead of html
app.get('/',(req,res) => res.json({msg:'Welcome to Lebanese Web Community'}));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
/*
* This line sets the port on which the Express app will listen. 
* process.env.PORT is the port environment variable (if set), 
* which is useful when deploying to other environments where the port might already be set 
* (like when deploying to Heroku or some other cloud provider). 
* If process.env.PORT is not set (like in a local environment), it defaults to port 6000.
*/
const PORT = process.env.PORT || 6000;

/*
* Finally, this line starts the server and makes it listen for connections on the specified port. 
* Once the server is running, it logs a message to the console indicating the port on which it's listening.
* So, to summarize, this simple server responds to any GET requests to the 
* root URL (http://localhost:5000/ in a local environment) with 'Hello World'.
*/

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));

