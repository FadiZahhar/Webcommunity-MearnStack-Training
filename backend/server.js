// import express function and use it to create express server-app
const app = require('express')(); 

app.get("/", (request, response) => {
  // simple html message to the page when requested
  response.send(`<h1>All contacts</h1>`);
});

app.post("/create-contact", (request, response) => {
  // some server validations...
  // if true
  // response.send(`<h1>contact registered!</h1>`);

  // if already exists
  response.send(`<h1 style="color: crimson">contact already exists!</h1>`);
});

app.put("/update-contact/:id", (request, response) => {
  // take that :id, some server validations...
  // if true
  // response.send(`<h1>contact updated!</h1>`);

  // if infos collides with another contact
  // take the contact name that collides 
  let collided_contact = "Someone#phone"; 
  let message = `
    <h1 style="color: crimson">
      contact infos resembles to an existing one: ${collided_contact}!
    </h1>
  `;
  response.send(message);
});

app.delete("/delete-contact/:id", (request, response) => {
  // some server validations...
  // (are you sure?)
  response.send(`<h1 style="color: green">contact deleted!</h1>`);
});

const PORT = process.env.PORT || 3333;
app.listen(
  PORT, 
  () => console.log(`Express/Node server running on http://localhost:${PORT}`)
);