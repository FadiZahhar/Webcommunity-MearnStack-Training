const express = require('express');
const router = express.Router();
// libraries to be added
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, async (req,res) => {
    try {
    const contacts = await Contact.find({ user: req.user.id }).sort({date: -1});
    res.json(contacts);
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', [auth, [
    check('name','Name is required')
    .not()
    .isEmpty()
]], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { name, email, phone, type} = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();

        res.json(contact);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/contacts:id
// @desc    Update contact
// @access  Private
router.put('/:id', auth, async  (req,res) => {
    const { name, email, phone, type } = req.body;

    // build contact object
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({msg: 'Contact not found' });

        // Make sure user owns contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, 
            { $set: contactFields}, 
            {new:true});

            res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route   DELETE api/contacts:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async (req,res) => {

    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({msg: 'Contact not found' });

        // Make sure user owns contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

       await Contact.findByIdAndRemove(req.params.id);

       res.json({msg:'Contact removed'})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;


/*

Here's what each part of the code does:

const express = require('express');: 
This line imports the Express.js library.

const router = express.Router();: 
This line creates a new router object, which can be used to add middleware and route handlers.

router.get('/', (req,res) => { res.send('Get all users contacts'); });: 
This is a route handler for a GET request at the path '/'. 
When the server receives a GET request at this path, it sends the string 'Get all users contacts' as a response. 
In a full implementation, this route would retrieve and return all contacts for a particular user.

router.post('/', (req,res) => { res.send('Add new contact'); });: 
This is a route handler for a POST request at the path '/'. 
When the server receives a POST request at this path, 
it sends the string 'Add new contact' as a response. 
In a full implementation, this route would add a new contact to the database for a particular user.

router.put('/:id', (req,res) => { res.send('Update contact'); });: 
This is a route handler for a PUT request at the path '/:id'. The :id is a route parameter, 
and its value can be accessed in the route handler with req.params.id. 
When the server receives a PUT request at this path, it sends the string 'Update contact' as a response. 
In a full implementation, this route would update the information for a specific contact.

router.delete('/:id', (req,res) => { res.send('Delete contact'); });: 
This is a route handler for a DELETE request at the path '/:id'. 
Like the PUT route, the :id is a route parameter. 
When the server receives a DELETE request at this path, 
it sends the string 'Delete contact' as a response. In a full implementation, 
this route would delete a specific contact.

module.exports = router;: 
This line exports the router object so it can be used in other parts of the application.

The comments above each route (such as 
// @route GET api/contacts) provide additional information about the route but don't affect how the code runs. 
These comments show the HTTP method and path for the route, a description of what the route does, and the access level for the route.

In a real-world application, this router would be imported into another file and connected to an app instance using something like app.use('/api/contacts', router);. 
This would mean that the routes defined in this router would actually be at the path '/api/contacts', 
'/api/contacts/:id', etc.

*/