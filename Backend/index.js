const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user_model');
const subject = require('./models/event_model');
const learningMaterial = require('./models/learningMaterial_model');
const SignIn = require('.functions/APIFunctions')

const app = express();
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('Zdravo!');
});

app.post('/api/newuser', SignIn);

app.listen(3000, () => {
    console.log('Server je pokrenut na portu 3000');
});

