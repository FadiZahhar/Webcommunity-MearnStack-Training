// import built in router function from express
// use that router to create functions that handles special URI resources
const router = require('express').Router();



// @route   GET api/
// @desc    GET contact list 
// @access  Private (to the user only)
router.get("/", (request, response) => {
  response.send(`<h1>All contacts</h1>`);
});



// @route   POST api/create-contact
// @desc    CREATE new contact 
// @access  Private (to the user only)
router.post("/", (request, response) => {
  response.send(`<h1>contact registered!</h1>`);
  // response.send(`<h1 style="color: crimson">contact already exists!</h1>`);
});



// @route   PUT api/update-contact/:id
// @desc    UPDATE new contact by id
// @access  Private (to the user only)
router.put("/:id", (request, response) => {
  // take :id parameter and process it
  let id = request.params.id;
  response.send(`<h1>contact ${id} updated!</h1>`);

  // on wrong validation
  let collided_contact = "Someone#phone";
  let message = `
    <h1 style="color: crimson">
      contact infos resembles to an existing one: ${collided_contact}!
    </h1>
  `;
  response.send(message);
});



// @route   DELETE api/delete-contact/:id
// @desc    DELETE a contact by an id 
// @access  Private (to the user only)
router.delete("/:id", (request, response) => {
  let id = request.params.id;

  // (are you sure?)
  response.send(`<h1 style="color: green">contact ${id} deleted!</h1>`);
});



module.exports = router;