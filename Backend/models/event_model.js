const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, enum: ['Predavanje', 'Izlozba', 'Dan otvorenih vrata'], required: true},
    tag: { type: String, enum: ['Statisika', 'Numerika', 'Vestacka intelegencija', 'Back-end', 'Front-end', 'Primenjena Fizika i Elektrotehnika'], require: true },
    price : { type: Number, default: 0, required: false },
    link: { type: String, required: false}
});

const subject = mongoose.model('Event', eventSchema);

module.exports = subject;