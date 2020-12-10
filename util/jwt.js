const { JsonWebTokenError } = require("jsonwebtoken");
require('dotenv').config({path:'.env'});

const jwt = require('jsonwebtoken');

const generateJwt = (uid, name) => {

    return new Promise((resole, reject) =>{

        const payload = {uid, name};
        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn: '2h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('Unable to generate token.');
            }
            resole(token);
        });

    });
}

module.exports = {
    generateJwt
}
