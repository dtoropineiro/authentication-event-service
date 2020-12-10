'use strict'

const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config({path:'.env'});

const PORT = process.env.PORT;
// express server
const app = express();

//db
dbConnection()

//CORS
app.use(cors());

//pulic dir
app.use(express.static('public'));

//read and body parsing
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

//listen requests
app.listen( PORT, () => {
    console.log(`Server running on port ${4000}`);
});
