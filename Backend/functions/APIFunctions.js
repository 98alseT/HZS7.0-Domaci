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
const Display = async (req, res) => {
    try {
        if (req.body.typePost == 'event') {
            const tags = req.body.tags;
            const types = req.body.type;

            let models;

            if(types && types.lenght > 0){
                models = await Event.find({ tag: { $in: types } });
            }

            if (tags && tags.length > 0) {
                models = models.filter(model => tags.some(tag => model.type.includes(tag)));
            }
            return res.status(200).json(models);
        } 
        else if (req.body.typePost == 'learningMaterial') {
            const tags = req.body.tags;
            if(tags && tags.lenght > 0){
                let models = await LearningMaterial.find({ tag: { $in: tags } });
                return res.status(200).json(models);
            }
            let models = await LearningMaterial.find();
            return res.status(200).json(models);
        }
        return res.status(400).json({ message: "Invalid typePost value" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};


module.exports = [AddNewEvent, AddNewLearningMaterial, Display];