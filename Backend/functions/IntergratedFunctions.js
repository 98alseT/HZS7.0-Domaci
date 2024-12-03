const User = require('../models/user_model');
const Event = require('../models/event_model');
const LearningMaterial = require('../models/learningMaterial_model');

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
    } catch (err) {
        console.error("Error fetching user:", err);
        throw err;
    }
};

module.exports = FindUser;
