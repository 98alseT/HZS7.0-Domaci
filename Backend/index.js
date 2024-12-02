const express = require('express');
const connectDB = require('./config/database');
const SignIn = require('./functions/APIFunctions')

const app = express();
app.use(express.json());

connectDB();

app.post('/api/newuser', async (req, res) => {
    await SignIn(req, res);
});

app.listen(3000, () => {
    console.log('Server je pokrenut na portu 3000');
});

