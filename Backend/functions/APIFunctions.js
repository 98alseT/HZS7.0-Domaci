const User = require('../models/user_model');
const subject = require('../models/event_model');
const learningMaterial = require('../models/learningMaterial_model');

const SignIn = async (req, res) =>{
    try{
        const data = req.body;
    
        let user = new User(data);
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