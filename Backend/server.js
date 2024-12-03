const express = require('express');
const connectDB = require('./config/database');
const [ClearTables, Write] = require('./functions/Dev');
const [SignIn, LogIn] = require('./functions/APIFunctions');
//temp
const User = require('./models/user_model');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

connectDB();

app.post('/api/signin', async (req, res) => {
    await SignIn(req, res);
});

app.post('/api/login', async (req, res) => {
    await LogIn(req,res);
});

app.get('/api/see', authenticateToken, async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const userId = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const filteredUsers = await User.findById(userId);

        if(filteredUsers == null){
            res.status(404).json({
                message: "Couldn't find the user."
            });
        }
        res.status(200).json(filteredUsers);
    } catch (error) {
        res.status(500).json({ 
            message: error.message 
        });
    }
});

app.listen(3000, () => {
    console.log('Server je pokrenut na portu 3000');
});

app.delete('/dev/brisi', ClearTables);
app.get('/dev/ispisi', async (req, res) => {
    await Write(req, res);
})