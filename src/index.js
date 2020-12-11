'use strict'

const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config({path:'.env'});

const PORT = process.env.PORT;
// express server

const startServer = async () => {
    const app = express();

    //db
    await dbConnection();
    
    //CORS
    app.use(cors());
    
    //pulic dir
    app.use(express.static('public'));
    
    //read and body parsing
    app.use(express.json());
    
    app.use('/api/auth', require('./routes/auth'));
    
    app.use('/api/events', require('./routes/events'));
    
    //listen requests
    app.listen( PORT, () => {
        console.log(`Server running on port ${4000}`);
    });

}

startServer();

