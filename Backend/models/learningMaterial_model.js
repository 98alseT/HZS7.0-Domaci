const mongoose = require('mongoose');

//Jos se ne koristi
const learningMaterialSchema = new mongoose.Schema({
    name: { type: String, required: true},
    tag: { type: String, enum: ['Statisika', 'Numerika', 'Vestacka intelegencija', 'Back-end', 'Front-end', 'Primenjena Fizika i Elektrotehnika'], require: true },
    link: { type: String, required: false}
});

const LearningMaterial = mongoose.model('learningMaterial', learningMaterialSchema);

module.exports = LearningMaterial;