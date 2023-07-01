const app = require('express')(); 

/* 
this greatly make our code maintable and scalable
it is important to always divide the code into multiple folders & files
put all route handlers inside a folder named 'routes'
*/

app.get('/api', (request, response) => {
  response.send("<h1>API Home page</h1>")
});

// using the contacts router to make different operations of saved contacts 
// read, create, update, delete
app.use("/api/contact", require('./routes/contacts.js'));


// using the auth router to secure the API
app.use("/api/auth", require("./routes/auth.js"));


// using the user router to view user info
app.use("api/user",  require("./routes/users.js"))


const PORT = process.env.PORT || 3333;
app.listen(
  PORT, 
  () => console.log(`Express/Node server running on http://localhost:${PORT}`)
);