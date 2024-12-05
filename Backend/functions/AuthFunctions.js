const User = require('../models/user_model');
const Event = require('../models/event_model');
const LearningMaterial = require('../models/learningMaterial_model');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const SignIn = async (req, res) => {
    try {
        const data = req.body;
        let user = new User(data);

        const userId = await User.findOne({ username: data.username });

        if (userId != null) {
            return res.status(303).json({ 
                message: "User already exists :(" 
            });
        }

        user = await user.save();
        
        console.log("Signed in successfully :D");

        const accessToken = await makeAccessToken(user);

        if (accessToken == null) {
            return res.status(501).json({
                message: "Couldn't generate an access token :("
            });
        }

        console.log("Token in res.cookie:", accessToken);

        res.cookie('token', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 86400000, // 24 hours
            path: '/',
        });

        res.status(201).json({
            accessToken: accessToken,
        });

        console.log("Token in res.json:", accessToken);
    } catch (error) {
        console.error("Error in SignIn route:", error);
        res.status(500).json({
            message: "Failed to sign in :(",
            error: error.message
        });
    }
};


const LogIn = async (req, res) => {
    try{
        const data = req.body;
        
        const currentUser = await User.findOne({username: data.username});

        if (currentUser == null) {
            return res.status(404).json({ 
                message: "Username ne postoji :(" 
            });
        }

        if(currentUser.password != data.password){
            return res.status(401).json({ 
                message: "Password je pogresan :(" 
            });
        }

        console.log("Logged in successfully :D");
        
        const accessToken = await makeAccessToken(currentUser);

        if(accessToken == null){
            return res.status(501).json({
                message: "Couldn't make an access token :("
            });
        }

        res.cookie('token', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 86400000, // 24 hours
            path: '/',
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
    const token = req.cookies.token;
    console.log(token);
    console.log('Access Token Secret:', process.env.ACCESS_TOKEN_SECRET);

    if (!token) return res.status(401).json({ message: "Unauthorized, no token :(" });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        console.log('Decoded Token:', decoded);
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

const makeAccessToken = async (currentUser) => {
    try {
        return jwt.sign(
            { id: currentUser._id, username: currentUser.username }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '24h' }
        );
    } catch (error) {
        console.log("Error u pravljenju tokena: " + error);
        return null;
    }
};

module.exports = [SignIn, LogIn, LogOut, authenticateToken];