const User = require('../models/user_model');
const Event = require('../models/event_model');
const LearningMaterial = require('../models/learningMaterial_model');

const FindUser = require('./IntergratedFunctions');

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

        res.status(201).json(user);

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

        res.status(201).json({
            message: "Uspesno ulogovan :D"
        })
    } catch(error){
        res.status(500).json({
            message: "Nisam uspeo LogIn :(",
            error: error.message
        });
    }
}

const AddNewEvent = async (req, res) =>{
    
}

const AddNewLearningMaterial = async (req, res) =>{
    
}

const ModelsForDisplay = async (req, res) =>{
    
}

module.exports = [SignIn, LogIn];