const mongoose = require('mongoose'); 
const config = require('config');
const db = config.get('mongoURI');

const connect_db = async () => {
    try {
        await mongoose.connect(db , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,        
            // useFindAndModify: false,
        })
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connect_db;
