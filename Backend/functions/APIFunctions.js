const User = require('../models/user_model');
const Event = require('../models/event_model');
const LearningMaterial = require('../models/learningMaterial_model');
require('dotenv').config();
const [FindUser, FindEvent] = require('./IntergratedFunctions');

//post
const AddNewEvent = async (req, res) =>{
    try {
        const data = req.body;
        let event = new Event(data);

        const eventId = await FindEvent(data.name);
        if (eventId) {
            return res.status(303).json({ 
                message: "Event vec postoji. :(" 
            });
        }
        
        console.log("Createing event is successfull :D");

        event = await event.save();

    } catch (error) {
        res.status(500).json({
            message: "Nisam uspeo da napravim event :(",
            error: error.message
        });
    }
}

//post
const AddNewLearningMaterial = async (req, res) =>{
    try {
        const data = req.body;
        let learningMaterial = new LearningMaterial(data);
        
        console.log("Creating learning material is successfull :D");

        learningMaterial = await learningMaterial.save();

    } catch (error) {
        res.status(500).json({
            message: "Nisam uspeo da napravim event :(",
            error: error.message
        });
    }
}

//get
const ModelsForDisplay = async (req, res) =>{
    if(req.body.type == 'event'){

    }
    else{

    }
}

module.exports = [AddNewEvent, AddNewLearningMaterial];