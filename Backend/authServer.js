const express = require('express');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/database');
const [SignIn, LogIn, LogOut, authenticateToken] = require('./functions/AuthFunctions');

const app = express();
app.use(cookieParser());
app.use(express.json());

connectDB();

app.delete('/logout', async (req, res) => {
    await LogOut(req, res);
});

app.post('/signin', async (req, res) => {
    await SignIn(req, res);
});

app.post('/login', async (req, res) => {
    await LogIn(req,res);
});

app.get('/token', authenticateToken, async (req, res) => {
    return res.status(200).json({ message: "Token is valid" });
});

app.listen(4000, () => {
    console.log('Authentication server je pokrenut na portu 4000');
});
