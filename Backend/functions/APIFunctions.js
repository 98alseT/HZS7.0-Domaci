const User = require('../models/user_model');
const Event = require('../models/event_model');
const LearningMaterial = require('../models/learningMaterial_model');
const [FindUser, makeToken] = require('./IntergratedFunctions');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SignIn = async (req, res) =>{
    try{
        const data = req.body;

        let user = new User(data);

        const userId = await FindUser(data.username);
        if (userId) {
            return res.status(303).json({ 
                message: "User vec postoji. :(" 
            });
        }
        
        user = await user.save();
        
        console.log("Signed in successfully :D");

        const accessToken = await makeToken(user.id);

        if(accessToken == null){
            return res.status(501).json({
                message: "Couldn't make an access token :("
            });
        }

        res.status(201).json({
            accessToken: accessToken
        });
    }catch(error){
        res.status(500).json({
            message: "Nisam uspeo SignIn :(",
            error: error.message
        });
    }
}

const LogIn = async (req, res) =>{
    try{
        const data = req.body;

        const userId = await FindUser(data.username);
        if (!userId) {
            return res.status(303).json({ 
                message: "Username ne postoji :(" 
            });
        }

        const currentUser = await User.findById(userId);

        if(currentUser.password != data.password){
            return res.status(303).json({ 
                message: "Password je pogresan :(" 
            });
        }

        console.log("Logged in successfully :D");
        
        const accessToken = await makeToken(currentUser.id);

        if(accessToken == null){
            return res.status(501).json({
                message: "Couldn't make an access token :("
            });
        }

        res.status(201).json({
            accesToken: accessToken
        });
    } catch(error){
        res.status(500).json({
            message: "Nisam uspeo LogIn :(",
            error: error.message
        });
    }
}

//post
const AddNewEvent = async (req, res) =>{
    
}

//post
const AddNewLearningMaterial = async (req, res) =>{
    
}

//get
const ModelsForDisplay = async (req, res) =>{
    
}

module.exports = [SignIn, LogIn];