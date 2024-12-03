const models = {
    user: require('../models/user_model'),
    event: require('../models/event_model'),
    learningMaterial: require('../models/learningMaterial_model')
    //Dodati jos ako dodamo jos... real
};

const ClearTables = async (req, res) => {
    try {
        for(let model in models){
            await models[model].deleteMany({});
        }

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

const Write = async (req, res) => {
    try {
        const model = req.query.model;

        if(!models[model]){
            res.status(400).json({ 
                message: "Ne postoji taj model :(" 
            });
        }

        model = await models[model].find();
        res.status(200).json(model);
    } catch (error) {
        res.status(500).json({ 
            message: "Error u preuzimanju podataka :(",
            error: error.message
        });
    }
}

module.exports = [ClearTables, Write];