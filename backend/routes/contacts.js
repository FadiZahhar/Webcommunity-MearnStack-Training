const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', (req,res) => {
    res.send('Get all users contacts');
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', (req,res) => {
    res.send('Add new contact');
});

// @route   PUT api/contacts:id
// @desc    Update contact
// @access  Private
router.put('/:id', (req,res) => {
    res.send('Update contact');
});

// @route   DELETE api/contacts:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', (req,res) => {
    res.send('Delete contact');
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