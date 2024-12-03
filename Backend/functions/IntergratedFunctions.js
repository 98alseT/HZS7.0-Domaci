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

const FindEvent = async (eventnameInput) => {
    try {
        const event = await Event.findOne({ name: eventnameInput });

        if (event) {
            console.log(`Event found: ${event}`);
            return event.id;
        } else {
            console.log("No event found with the specified name.");
            return null; 
        }
    } catch (error) {
        console.error("Error fetching event:", error);
        throw error;
    }
};

module.exports = [FindUser, FindEvent];
