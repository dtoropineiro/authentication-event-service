'use strict'

const {response, json} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {generateJwt} = require('../util/jwt')


const createUser = async (req, res = response ) => {
    
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email: email});
        if(user){
            return res.status(400).json({
                ok: false,
                msg: "Email already registered."
            });
        }
        user = new User(req.body);
        //pass encryption
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //generate JWT
        const token = await generateJwt(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    }catch (error){
        res.status(500).json({
            ok: false,
            msg: 'Error...',
        });
    }
}

const userLogin = async (req, res = response ) => {
    const {email, password} = req.body;
    try{
        const  user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({
                ok: false,
                msg: "Login Failed: Your e-mail address or password is incorrect."
            });
        }

        //confirm pass
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: "Login Failed: Your e-mail address or password is incorrect."
            });
        }

        //generate JWT
        const token = await generateJwt(user.id, user.name);
        
        //success response
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    }catch (error){
        res.status(500).json({
            ok: false,
            msg: 'Error...',
        });
    }

}

const revalidateToken = async (req, res = response ) => {
    const {uid, name} = req;

    //generate new jwt and return it
    const token = await generateJwt(uid, name);

    res.json({
        ok: true,
        token
    })
}

module.exports = { 
    createUser, 
    userLogin, 
    revalidateToken 
};
