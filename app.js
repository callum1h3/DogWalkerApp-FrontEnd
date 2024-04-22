const express = require('express')
const app = express()
var path = require('path');
var profile = path.join(__dirname, 'profile');
var mainpage = path.join(__dirname, 'main');
var public = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3001;

const http = require('http');

// Just simple web server to quickly send all of the website code to the client.

// Main Page
app.get('/', function(req, res) {
    res.sendFile(path.join(mainpage, 'index.html'));
});

app.use('/', express.static(mainpage));

app.use('/public/', express.static(public));

// Login Screen
app.get('/profile/', function(req, res) {
    res.sendFile(path.join(profile, 'index.html'));
});

app.use('/profile/', express.static(profile));

const httpServer = http.createServer(app);
httpServer.listen(3001, () => console.log('server ready'))

