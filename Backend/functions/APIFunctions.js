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

        res.status(200).json({ 
            message: "Event napravljen. :)" 
        });
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
        res.status(200).json({ 
            message: "Material napravljen. :)" 
        });
    } catch (error) {
        res.status(500).json({
            message: "Nisam uspeo da napravim material :(",
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

//patch
const UpdateEvent = async (req, res) => {
    try {
        const eventId = req.body.id;
        const event = await Event.updateOne({ _id: eventId }, req.body);
        
        if (event.modifiedCount === 0) {
            return res.status(200).json({ message: "No changes were made" });
        }

        return res.status(200).json({ message: "Event updated successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
}


//delete
const DeleteEvent = async (req, res) => {
    try {
        const eventId = req.body.id;

        const result = await Event.findByIdAndDelete(eventId);
        
        if (!result) {
            return res.status(404).json({ message: "Event not found" });
        }

        return res.status(200).json({ message: "Event deleted successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

//patch
const UpdateLearningMaterial = async (req, res) => {
    try {
        const learningMaterialId = req.body.id;
        const learningMaterial = await LearningMaterial.updateOne({ _id: learningMaterialId }, req.body);
        
        if (learningMaterial.modifiedCount === 0) {
            return res.status(200).json({ message: "No changes were made" });
        }

        return res.status(200).json({ message: "Material updated successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
}


//delete
const DeleteLearningMaterial = async (req, res) => {
    try {
        const learningMaterialId = req.body.id;

        const result = await LearningMaterial.findByIdAndDelete(learningMaterialId);
        
        if (!result) {
            return res.status(404).json({ message: "Material not found" });
        }

        return res.status(200).json({ message: "Material deleted successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

module.exports = [AddNewEvent, AddNewLearningMaterial, Display, UpdateEvent, DeleteEvent, UpdateLearningMaterial, DeleteLearningMaterial];