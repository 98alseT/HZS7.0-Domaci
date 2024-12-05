const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    user: { type: String, required: true},
    title: { type: String, required: true},
    name: { type: String, required: true},
    description: { type: String, required: true},
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, enum: ['Predavanje', 'Izlozba', 'Dan otvorenih vrata'], required: true},
    tag: { type: String, enum: ['Statisika', 'Numerika', 'Vestacka intelegencija', 'Back-end', 'Front-end', 'Primenjena Fizika i Elektrotehnika'], require: true },
    price : { type: Number, default: 0, required: false },
    link: { type: String, required: false},
    eventPicture: {type: String, requited: false} //Pamtimo URL slike koja se cuva na serveru ne u databazi
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;