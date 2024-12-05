const User = require('../models/user_model');
const Event = require('../models/event_model');
const LearningMaterial = require('../models/learningMaterial_model');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const AddNewEvent = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized. No token provided."
            });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const username = decoded.username;

        console.log('Decoded username:', username);

        const data = req.body;
        let event = new Event({
            ...data,
            user: username
        });

        const eventId = await Event.findOne({ name: data.title });

        if (eventId) {
            return res.status(303).json({
                message: "Event already exists. :("
            });
        }

        event = await event.save();

        console.log("Creating event was successful :D");

        res.status(200).json({
            message: "Event created successfully. :)"
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({
            message: "Failed to create the event :(",
            error: error.message
        });
    }
};

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
        const eventId = req.body.id;

        console.log(eventId);

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
        const { postId } = req.params;
        const post = await Event.findById(postId);
    
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Failed to fetch post' });
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

const getUsernameFromToken = (req, res, next) => {
    const token = req.cookies.token;  // Assuming token is stored in cookies
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized. No token provided." });
    }
  
    try {
      // Decode the token to get the username
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.username = decoded.username;  // Attach the username to the request object
      next();  // Proceed to the next middleware or route handler
    } catch (error) {
      return res.status(401).json({ message: "Invalid token." });
    }
};

const Search = async (req, res) => {
    try {
        searchText = req.body.text;
        const query = {
            $or: [
                { title: { $regex: searchText, $options: 'i' } },     // Search in title
                { location: { $regex: searchText, $options: 'i' } },  // Search in location
                { type: { $regex: searchText, $options: 'i' } },      // Search in type
                { tag: { $regex: searchText, $options: 'i' } }        // Search in tag
            ]
        };

        // Query the database
        const events = await Event.find(query);

        res.status(200).json(events);
    } catch (error) {
        console.error('Error searching events:', error);
        res.status(400).json(error);
    }
};

module.exports = [AddNewEvent, AddNewLearningMaterial, Display, UpdateEvent, DeleteEvent, UpdateLearningMaterial, DeleteLearningMaterial, GetEvent, GetMaterial, MyEvents, MyMaterials, getUsernameFromToken, Search];