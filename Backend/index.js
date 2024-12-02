const express = require('express');
const connectDB = require('./config/database');
const SignIn = require('./functions/APIFunctions');
const User = require('./models/user_model');

const app = express();
app.use(express.json());

connectDB();

app.post('/api/newuser', async (req, res) => {
    await SignIn(req, res);
});

app.get('/api/loguser', async (req, res) => {
    try{
        const users = await User.find();
        res.status(201);
        res.json(users)
    } catch (error) {
        res.status(500);
        res.json({message: error.message});
    }
})

app.listen(3000, () => {
    console.log('Server je pokrenut na portu 3000');
});

