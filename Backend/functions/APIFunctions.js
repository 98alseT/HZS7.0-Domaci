const User = require('../models/user_model');
const Event = require('../models/event_model');
const LearningMaterial = require('../models/learningMaterial_model');
require('dotenv').config();

//post
const AddNewEvent = async (req, res) =>{
    try {
        const data = req.body;
        let event = new Event(data);

        const eventId = await Event.findOne({name: data.title});
        if (eventId) {
            return res.status(303).json({ 
                message: "Event vec postoji. :(" 
            });
        }

        event = await event.save();

        console.log("Creating event is successfull :D");

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

//post
const Display = async (req, res) => {
    try {
        if (req.body.typePost == 'event') {
            const tags = req.body.tags;
            const types = req.body.type;

            let query = {};

            if (types && types.length > 0) {
                query.type = { $in: types };
            }

            if (tags && tags.length > 0) {
                query.tag = { $in: tags };
            }

            let models = await Event.find(query);

            return res.status(200).json(models);
        } 
        else if (req.body.typePost == 'learningMaterial') {
            const tags = req.body.tags;

            let query = {};

            if (tags && tags.length > 0) {
                query.tag = { $in: tags };
            }

            let models = await LearningMaterial.find(query);
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
        const eventId = req.body._id;
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
        const eventId = req.body._id;

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
        const learningMaterialId = req.body._id;
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
        const learningMaterialId = req.body._id;

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

//get
const GetEvent = async (req, res) => {
    try {
        const eventBody = req.body;

        const event = await Event.findOne(eventBody);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        return res.status(200).json(event.id);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
}


//get
const GetMaterial = async (req, res) => {
    try {
        const learningMaterialBody = req.body;

        const learningMaterial = await LearningMaterial.findOne(learningMaterialBody);

        if (!learningMaterial) {
            return res.status(404).json({ message: "Material not found" });
        }

        return res.status(200).json(learningMaterial.id);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

//get
const MyEvents = async (req, res) => {
    try {
        const { user } = req.body;

        const events = await Event.find({ user: user });

        if (events.length === 0) {
            return res.status(404).json({ message: "No events found" });
        }

        return res.status(200).json(events);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

//get
const MyMaterials = async (req, res) => {
    try {
        const { user } = req.body;

        const learningMaterial = await LearningMaterial.find({ user: user });

        if (learningMaterial.length === 0) {
            return res.status(404).json({ message: "No materials found" });
        }

        return res.status(200).json(learningMaterial);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

module.exports = [AddNewEvent, AddNewLearningMaterial, Display, UpdateEvent, DeleteEvent, UpdateLearningMaterial, DeleteLearningMaterial, GetEvent, GetMaterial, MyEvents, MyMaterials];