const User = require('../models/user_model');
const Event = require('../models/event_model');
const LearningMaterial = require('../models/learningMaterial_model');
require('dotenv').config();

//post
const AddNewEvent = async (req, res) =>{
    try {
        const data = req.body;
        let event = new Event(data);

        const eventId = await Event.findOne({name: data.name});
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
    if(req.body.typePost == 'event'){
        tags = req.body.tags;
        types = req.body.type;
        let models = await Event.find({ tag: types});
        models = models.find({type: tags})
        res.status(200).json(models);
    }
    else if(req.body.typePost == 'learningMaterial'){
        tags = req.body.tags;
        let models = await LearningMaterial.find({ tag: tags});
        res.status(200).json(models);
    }
}

module.exports = [AddNewEvent, AddNewLearningMaterial];