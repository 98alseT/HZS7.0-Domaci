const User = require('../models/user_model');
const Event = require('../models/event_model');
const LearningMaterial = require('../models/learningMaterial_model');

const ClearTables = async (req, res) => {
    try {
        await User.deleteMany({});
        await Event.deleteMany({});
        await LearningMaterial.deleteMany({});

        res.status(200).json({
            message:"Sve tabele izbrisane!"
        });
    } catch (error) {
        console.error("Error brisanja tabela:", error);
        res.status(500).json({ 
            message: "Nisam uspeo da obrisem :(", 
            error: error.message 
        });
    }
}

module.exports = ClearTables;