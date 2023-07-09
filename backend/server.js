const express = require('express'); 
const connect_db = require('./config/db');
const app = express();

connect_db();

app.use(express.json({extended:false}));

app.get('/', (req, res) => res.json({msg: 'Welcome to Lebanese Web Community!'}));

//define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'))

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));