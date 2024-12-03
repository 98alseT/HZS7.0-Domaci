const User = require('../models/user_model');
const Event = require('../models/event_model');
const LearningMaterial = require('../models/learningMaterial_model');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const SignIn = async (req, res) => {
    try{
        const data = req.body;
        let user = new User(data);

        const userId = await User.findOne({username: data.username});

        if (userId != null) {
            return res.status(303).json({ 
                message: "User vec postoji. :(" 
            });
        }
        
        res.clearCookie('token');

        user = await user.save();
        
        console.log("Signed in successfully :D");

        const accessToken = await makeAccessToken(user);

        if(accessToken == null){
            return res.status(501).json({
                message: "Couldn't make an access token :("
            });
        }

        res.cookie('token', accessToken, {
            httpOnly: true, // Prevent access via JavaScript
            sameSite: 'strict', // Protect against CSRF
            maxAge: 86400000, // Trajanje od 24 sata u milisekundama
        });

        res.status(201).json({
            accessToken: accessToken,
        });
    }catch(error){
        res.status(500).json({
            message: "Nisam uspeo SignIn :(",
            error: error.message
        });
    }
};

const LogIn = async (req, res) => {
    try{
        const data = req.body;
        
        const currentUser = await User.findOne();

        if (currentUser == null) {
            return res.status(303).json({ 
                message: "Username ne postoji :(" 
            });
        }

        if(currentUser.password != data.password){
            return res.status(303).json({ 
                message: "Password je pogresan :(" 
            });
        }

        res.clearCookie('token');

        console.log("Logged in successfully :D");
        
        const accessToken = await makeAccessToken(currentUser);

        if(accessToken == null){
            return res.status(501).json({
                message: "Couldn't make an access token :("
            });
        }

        res.cookie('token', accessToken, {
            httpOnly: true, // Prevent access via JavaScript
            sameSite: 'strict', // Protect against CSRF
            maxAge: 86400000, // Trajanje od 24 sata u milisekundama
        });

        res.status(201).json({
            accesToken: accessToken,
        });
    } catch(error){
        res.status(500).json({
            message: "Nisam uspeo LogIn :(",
            error: error.message
        });
    }
};

const LogOut = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'strict',
        });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to log out' });
    }
};

const authenticateToken = async (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error,user) => {
        if(error) return res.status(403);
        req.user = user;
        next();
    });
};

const makeAccessToken = async (currentUser) => {
    try {
        const accessToken = jwt.sign({id: currentUser.id, username: currentUser.username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '48h' });
        return accessToken;
    } catch (error) {
        console.log("Error u pravljenju tokena: " + error);
        return null;
    }
};

module.exports = [SignIn, LogIn, LogOut, authenticateToken];