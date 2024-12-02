const User = require('../models/user_model');
const Event = require('../models/event_model');
const LearningMaterial = require('../models/learningMaterial_model');

const FindUser = require('./IntergratedFunctions');

const SignIn = async (req, res) =>{
    try{
        const data = req.body;

        let user = new User(data);

        const existingUserId = await FindUser(data.username);
        if (existingUserId) {
            return res.status(303).json(
                { message: "User vec postoji." }
            );
        }
        
        user = await user.save();

        res.status(201);
        res.json(user);
    }catch(error){
        res.status(500);
        res.json({message: error.message});
    }
}

const LogIn = async (req, res) =>{
    
}

const AddNewEvent = async (req, res) =>{
    
}

const AddNewLearningMaterial = async (req, res) =>{
    
}

const ModelsForDisplay = async (req, res) =>{
    
}

module.exports = SignIn;