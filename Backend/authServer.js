const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectDB = require('./config/database');
const [SignUp, LogIn, LogOut, authenticateToken] = require('./functions/AuthFunctions');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173', credentials: true}));

connectDB();



app.delete('/logout', async (req, res) => {
    await LogOut(req, res);
});

app.post('/sign-up', async (req, res) => {
    await SignUp(req, res);
});

app.post('/log-in', async (req, res) => {
    await LogIn(req,res);
});

app.get('/token', authenticateToken, async (req, res) => {
    return res.status(200).json({ message: "Token is valid" });
});

app.listen(4000, () => {
    console.log('Authentication server je pokrenut na portu 4000');
});
