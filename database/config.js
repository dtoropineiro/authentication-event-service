const mongoose = require('mongoose');
require('dotenv').config({path:'.env'});

const connectionStr = process.env.DB_PREFIX + process.env.DB_USER +
':' + process.env.DB_PASS + '@' + process.env.DB_CLUSTER + '/' + process.env.DB_NAME;

const dbConnection = async() => {
    try{
        await mongoose.connect(connectionStr, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            userCreateIndex: true
        });
    console.log('Database connections success.')
    }catch (error){
        console.log(error);
        throw new Error('Failed to initialize database connection.')
    }
}

module.exports = {
    dbConnection
}
