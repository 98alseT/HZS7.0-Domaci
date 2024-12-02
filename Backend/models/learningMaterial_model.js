const mongoose = require('mongoose');

const learningMaterialSchema = new mongoose.Schema({
    type: { type: String, enum: ['Predavanje', 'Izlozba', 'Dan otvorenih vrata'], required: true},
    tag: { type: String, enum: ['Statisika', 'Numerika', 'Vestacka intelegencija', 'Back-end', 'Front-end', 'Primenjena Fizika i Elektrotehnika'], require: true },
    link: { type: String, required: false}
});

const LearningMaterial = mongoose.model('learningMaterial', learningMaterialSchema);

module.exports = LearningMaterial;