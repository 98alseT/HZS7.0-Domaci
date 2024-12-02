const express = require('express');
const connectDB = require('./config/database');

const app = express();
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('Zdravo!');
});

app.post('/api/books')

app.listen(3000, () => {
    console.log('Server je pokrenut na portu 3000');
});

