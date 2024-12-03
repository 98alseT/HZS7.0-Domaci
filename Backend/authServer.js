const express = require('express');
const connectDB = require('./config/database');
const [ClearTables, Write] = require('./functions/Dev');
const [SignIn, LogIn, LogOut, authenticateToken] = require('./functions/AuthFunctions');

const app = express();
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

app.post('/token', async (req, res) => {
    await checkToken(req, res);
});


app.listen(4000, () => {
    console.log('Authentication server je pokrenut na portu 4000');
});
