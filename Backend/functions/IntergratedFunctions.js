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

module.exports = FindUser;
