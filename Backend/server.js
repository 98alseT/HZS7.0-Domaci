const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectDB = require('./config/database');
const [ClearTables, Write] = require('./functions/Dev');
const [AddNewEvent, AddNewLearningMaterial, Display, UpdateEvent, DeleteEvent, UpdateLearningMaterial, DeleteLearningMaterial, GetEvent, GetMaterial, MyEvents, MyMaterials, getUsernameFromToken] = require('./functions/APIFunctions');
const [SignIn, LogIn, LogOut, authenticateToken] = require('./functions/AuthFunctions');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173', credentials: true}));

connectDB();

app.get('/api/myevents', authenticateToken, async (req, res) => {
    await MyEvents(req,res);
});

app.get('/api/mymaterials', authenticateToken, async (req, res) => {
    await MyMaterials(req,res);
});

app.get('/api/event/current', authenticateToken, async (req, res) => {
    await GetEvent(req,res);
});

app.get('/api/material/current', authenticateToken, async (req, res) => {
    await GetMaterial(req,res);
});

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

app.post('/api/display', authenticateToken, async (req, res) => {
    await Display(req,res);
})

app.listen(3000, () => {
    console.log('Server je pokrenut na portu 3000');
});

app.get('/api/get-username', getUsernameFromToken, (req, res) => {
    res.json({ username: req.username });
});
  

app.delete('/dev/brisi', ClearTables);
app.get('/dev/ispisi', async (req, res) => {
    await Write(req, res);
});