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



/*
 * steps for create contact:
 *  1) add authentications and validation before handling request
 *  2) take the contact info from req.body
 *  3) create and save a contact entry in db
 *  4) return the new contact info to client
 *  5) handle server errors
*/
// @route   POST api/contact/
// @desc    CREATE new contact 
// @access  Private (to the user only)
router.post("/", auth, [
  check("name", "Please enter a name").not().isEmpty()
], async (req, response) => {
  const errors = validationResult(req);
  if(!errors.isEmpty())
    response.status(400).json({ errors: errors.array() });

  const { name, email, phone, type } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id,
    });

    const contact = await newContact.save();

    response.json(contact);
  } catch (err) {
    console.error(err.message);
    response.status(500).send("Server Error");
  }
});


/*
 * steps to update contact:
 *  1) add authentication middleware to verify logged in user
 *  2) take the id given as route parameter (contact id)
 *  3) build the updated version depending on data send in request
 *  4) handle potential errors
 *  5) find the contact to be updated by its id findById()
 *  6) make sure the user owns that contact
 *  7.1) save the new infos to that contact using findByIdAndUpdate()
 *  7.2) use {$set: updatedEnt}, {new: true} in order to 
 *       update existing entries
*/
// @route   PUT api/contact/:id
// @desc    UPDATE new contact by id
// @access  Private (to the user only)
router.put('/:id', auth, async (req, response) => {
  // take :id parameter and process it
  let { id } = req.params;

  const { name, email, phone, type } = req.body;
  const updated = {};

  if(name) updated.name = name; 
  if(email) updated.email = email; 
  if(phone) updated.phone = phone; 
  if(type) updated.type = type; 

  try{
    let contact = await Contact.findById(id);
    if(!contact) return response.status(404).json({msg: 'Contact not found' });

    if(contact.user.toString() !== req.user.id)
      return response.status(401).json({ msg: 'Unauthorized' });

      contact = await Contact.findByIdAndUpdate(id, 
        {$set: updated}, 
        {new: true}
      );

      response.json(contact);
  }catch(err){
    console.log("🚀 ~ file: contacts.js:98 ~ router.put ~ err:", err.message)
    response.status(500).send("server errorrrrRRrr");
  }
});


/*
 * steps to update contact:
 *  1) add authentication middleware to verify logged in user
 *  2) take the id given as route parameter (contact id)
 *  3) handle potential errors
 *  4) find the contact to be removed by its id findById()
 *  5) make sure the user owns that contact
 *  6) remove that contact using findByIdAndRemove()
*/
// @route   DELETE api/contact/:id
// @desc    DELETE a contact by an id 
// @access  Private (to the user only)
router.delete("/:id", auth, async (req, response) => {
  let { id } = req.params;

  try{
    let contact = await Contact.findById(id);
    if(!contact) return response.status(404).json({msg: 'Contact not found' });

    if(contact.user.toString() !== req.user.id)
      return response.status(401).json({ msg: 'Unauthorized' });

      contact = await Contact.findByIdAndRemove(id);

      response.json({ msg: "contact removed! yeeehaw" });
    }catch(err){
      console.log("🚀 ~ file: contacts.js:98 ~ router.put ~ err:", err.message)
      response.status(500).send("server errorrrrRRrr");
    }
});



module.exports = router;