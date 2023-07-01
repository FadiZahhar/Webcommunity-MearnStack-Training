const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send('GET logged in user');
});


router.post('/', (req,res) => {
    res.send('Log in user');
});


module.exports = router;