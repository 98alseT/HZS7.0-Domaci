const express = require('express');
const connectDB = require('./config/database');
const ClearTables = require('./functions/Dev');
const [SignIn, LogIn] = require('./functions/APIFunctions');


const app = express();
app.use(express.json());
//test
connectDB();

app.post('/api/brisi', ClearTables);

app.post('/api/signin', async (req, res) => {
    await SignIn(req, res);
});

app.get('/api/login', async (req, res) => {
    await LogIn(req,res);
});

app.listen(3000, () => {
    console.log('Server je pokrenut na portu 3000');
});

