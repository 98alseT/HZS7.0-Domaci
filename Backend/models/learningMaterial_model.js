const mongoose = require('mongoose');

const learningMaterialSchema = new mongoose.Schema({
    user: { type: String, required: true},
    name: { type: String, required: true},
    tag: { type: String, enum: ['Statisika', 'Numerika', 'Vestacka intelegencija', 'Back-end', 'Front-end', 'Primenjena Fizika i Elektrotehnika'], require: true },
    link: { type: String, required: false},
    learningMatPicture: {type: String, requited: false} //Pamtimo URL slike koja se cuva na serveru ne u databazi
});

const LearningMaterial = mongoose.model('learningMaterial', learningMaterialSchema);

module.exports = LearningMaterial;