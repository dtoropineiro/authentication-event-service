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
       
    const events = await Event.find().populate('user', 'name');
    res.json({
        ok: true,
        events
    })
}

const updateEvent = async (req, res = response ) => {
       
    const eventId = req.params.id;
    const uid = req.uid;
    
    try{
        const event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'Event not found.',
            });
        }
        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'User does not have permission to update this event.',
            });
        }
         
        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new:true});

        res.json({
            ok: true,
            event: updatedEvent
        })
    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Error...',
        });
    }


}

const deleteEvent = async (req, res = response ) => {
       
    const eventId = req.params.id;
    const uid = req.uid;

    try{
        const event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'Event not found.',
            });
        }
        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'User does not have permission to delete this event.',
            });
        }
         

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true,
            msg: `Event with eventId ${eventId} deleted.`
        })
    }catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Error...',
        });
    }
}

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
};
