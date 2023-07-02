const express = require('express');
// adding the config db
const connectDB = require('./config/db');

const app = express();
// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended:false}));

app.get('/',(req,res) => res.json({msg:'Welcome to Lebanese Web Community'}));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 6000;


app.listen(PORT,() => console.log(`Server started on port ${PORT}`));