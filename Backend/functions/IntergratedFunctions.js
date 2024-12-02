const User = require('../models/user_model');
const Event = require('../models/event_model');
const LearningMaterial = require('../models/learningMaterial_model');

const FindUser = async (usernameInput) => {
    try {
        // Use Mongoose's findOne method to fetch the user directly by username
        const user = await User.findOne({ username: usernameInput });

        if (user) {
            console.log(`User found: ${user}`);
            return user.id; // Return the user's ID if found
        } else {
            console.log("No user found with the specified username.");
            return null; // Return null if no user is found
        }
    } catch (err) {
        console.error("Error fetching user:", err);
        throw err; // Throw the error for the caller to handle
    }
};

module.exports = FindUser;
