const express = require('express')
const app = express()
var path = require('path');
var login = path.join(__dirname, 'login');
var mainpage = path.join(__dirname, 'main');

const PORT = process.env.PORT || 3001;

// Just simple web server to quickly send all of the website code to the client.

// Main Page
app.get('/', function(req, res) {
    res.sendFile(path.join(mainpage, 'index.html'));
});

app.use('/', express.static(mainpage));

// Login Screen
app.get('/login/', function(req, res) {
    res.sendFile(path.join(login, 'index.html'));
});

app.use('/login/', express.static(login));

app.listen(PORT, () => console.log('server ready'))

