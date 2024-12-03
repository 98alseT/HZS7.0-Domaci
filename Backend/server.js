const express = require('express');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/database');
const [ClearTables, Write] = require('./functions/Dev');
const [AddNewEvent, AddNewLearningMaterial] = require('./functions/APIFunctions');
const [SignIn, LogIn, LogOut, authenticateToken] = require('./functions/AuthFunctions');

const app = express();
app.use(cookieParser());
app.use(express.json());

connectDB();

app.post('/api/makeNewEvent', authenticateToken, async (req, res) => {
    await AddNewEvent(req,res);
});

app.post('/api/makeNewLearningMaterial', authenticateToken, async (req, res) => {
    await AddNewLearningMaterial(req,res);
});

app.listen(3000, () => {
    console.log('Server je pokrenut na portu 3000');
});

app.delete('/dev/brisi', ClearTables);
app.get('/dev/ispisi', async (req, res) => {
    await Write(req, res);
});