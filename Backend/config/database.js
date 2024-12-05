const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);

        const connection = await mongoose.connect(
            'mongodb+srv://admin:admin@hzsrad.skca8.mongodb.net/Hzsrad?retryWrites=true&w=majority&appName=Hzsrad'
        );

        console.log('MongoDB Connected: ' + connection.connection.host);
    } catch (error) {
        console.error('Error: ' + error.message);
        process.exit(1);
    }
}

module.exports = connectDB;