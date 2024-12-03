const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);

        const connection = await mongoose.connect(
            'mongodb+srv://admin:admin@cluster0.kpxa4.mongodb.net/hzs-radionica?retryWrites=true&w=majority&appName=Cluster0'
        );

        console.log('MongoDB Connected: ' + connection.connection.host);
    } catch (error) {
        console.error('Error: ' + error.message);
        process.exit(1);
    }
}

module.exports = connectDB;