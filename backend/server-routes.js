const app = require('express')(); 

// this greatly make our code maintable and scalable
// using the contacts router I created inside routers folder
app.use("/contact", require('./routes/contacts.js'));


const PORT = process.env.PORT || 3333;
app.listen(
  PORT, 
  () => console.log(`Express/Node server running on http://localhost:${PORT}`)
);