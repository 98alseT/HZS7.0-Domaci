const User = require('../models/user_model');
const Event = require('../models/event_model');
const LearningMaterial = require('../models/learningMaterial_model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const FindUser = async (usernameInput) => {
    try {
        const user = await User.findOne({ username: usernameInput });

        if (user) {
            console.log(`User found: ${user}`);
            return user.id;
        } else {
            console.log("No user found with the specified username.");
            return null; 
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
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
}
module.exports = FindUser;
