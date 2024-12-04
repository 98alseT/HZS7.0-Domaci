const express = require('express');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/database');
const [ClearTables, Write] = require('./functions/Dev');
const [AddNewEvent, AddNewLearningMaterial, Display, UpdateEvent, DeleteEvent, UpdateLearningMaterial, DeleteLearningMaterial] = require('./functions/APIFunctions');
const [SignIn, LogIn, LogOut, authenticateToken] = require('./functions/AuthFunctions');

const app = express();
app.use(cookieParser());
app.use(express.json());
 
connectDB();

app.post('/api/event', authenticateToken, async (req, res) => {
    await AddNewEvent(req,res);
});

app.patch('/api/event', authenticateToken, async (req, res) => {
    await UpdateEvent(req,res);
});

app.delete('/api/event', authenticateToken, async (req, res) => {
    await DeleteEvent(req,res);
});

app.post('/api/material', authenticateToken, async (req, res) => {
    await AddNewLearningMaterial(req,res);
});

app.patch('/api/material', authenticateToken, async (req, res) => {
    await UpdateLearningMaterial(req,res);
});

app.delete('/api/material', authenticateToken, async (req, res) => {
    await DeleteLearningMaterial(req,res);
});

app.get('/api/display', authenticateToken, async (req, res) => {
    await Display(req,res);
})

app.listen(3000, () => {
    console.log('Server je pokrenut na portu 3000');
});

app.delete('/dev/brisi', ClearTables);
app.get('/dev/ispisi', async (req, res) => {
    await Write(req, res);
});