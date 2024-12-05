const mongoose = require('mongoose');

const learningMaterialSchema = new mongoose.Schema({
    user: { type: String, required: true},
    name: { type: String, required: true},
    tag: { type: String, enum: ['Statisika', 'Numerika', 'Vestacka intelegencija', 'Back-end', 'Front-end', 'Primenjena Fizika i Elektrotehnika'], require: true },
    link: { type: String, required: false},
    png: {type: Image, requited: false}
});

const LearningMaterial = mongoose.model('learningMaterial', learningMaterialSchema);

module.exports = LearningMaterial;