'use strict'

const Event = require('../models/Event')

const createEvent = async (req, res = response ) => {
       
    const event = new Event(req.body);
    try{
        event.user = req.uid;
        const savedEvent = await event.save();
        res.status(201).json({
            ok: true,
            msg: 'createEvent',
            event: savedEvent
        })
    }catch (error){
        res.status(500).json({
            ok: false,
            msg: 'Error...',
        });
    }
}

const getEvents = async (req, res = response ) => {
       

    res.json({
        ok: true,
        msg: 'getEvents'
    })
}

const updateEvent = async (req, res = response ) => {
       

    res.json({
        ok: true,
        msg: 'updateEvent'
    })
}

const deleteEvent = async (req, res = response ) => {
       

    res.json({
        ok: true,
        msg: 'deleteEvent'
    })
}

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
};
