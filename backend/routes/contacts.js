// import built in router function from express
// use that router to create functions that handles special URI resources
const router = require('express').Router();

// necessary packages & files
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');


/*
 * in order to retrieve all created contacts: 
 *  1) use the auth middleware to authorize user access 
 *  2) get the contacts created by the logged in user (using user.id)
 *     how? each time a contact is created, the user.id of the 
 *     logged in user is saved along with it.
 *  
 *  3) [optional] sort contacts.
 *     date: -1 means descending order of created contacts, most recent 
 *     are shown first.
 */
// @route   GET api/contact/
// @desc    GET contact list 
// @access  Private (to the user only)
router.get("/", auth, async (req, response) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({date: -1});
    response.json(contacts);
  } catch(err) {
    console.log(err.message);
    response.status(500).send('Server Error');
  }
});



// @route   POST api/contact/
// @desc    CREATE new contact 
// @access  Private (to the user only)
router.post("/", (request, response) => {
  response.send(`<h1>contact registered!</h1>`);
  // response.send(`<h1 style="color: crimson">contact already exists!</h1>`);
});



// @route   PUT api/contact/:id
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



// @route   DELETE api/contact/:id
// @desc    DELETE a contact by an id 
// @access  Private (to the user only)
router.delete("/:id", (request, response) => {
  let id = request.params.id;

  // (are you sure?)
  response.send(`<h1 style="color: green">contact ${id} deleted!</h1>`);
});



module.exports = router;