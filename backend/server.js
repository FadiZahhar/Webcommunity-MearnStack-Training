// info about basic server config found in extra-practice/server.js
const express = require("express");
const app = express();


// connect to mongo database
const connect_mongo_db = require("../config/mongo-db");
connect_mongo_db();


// init this middleware of express for it to work properly
// it will automatically parse incoming JSON requests into JavaScript objects
app.use(express.json({ extended: false }));


/* 
 * this greatly make our code maintable and scalable
 * it is important to always divide the code into multiple folders & files
 * put all route handlers inside a folder named 'routes'
**/
// a default api message if no resource was specified
app.get("/", (req, response) => {
  response.json({ message: "Welcome to web development training" });
});


/*
 * using the contacts router to make CRUD operations to contacts
 * using the auth router to secure the API
 * using the user router to view user info
**/
app.use("/api/contact", require("./routes/contacts.js"));
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/user", require("./routes/users.js"));


// if environment variable PORT is not specified, 3333 will be used
const PORT = process.env.PORT || 3333;
app.listen(PORT, () =>
  console.log(`Express/Node server running on http://localhost:${PORT}`)
);
