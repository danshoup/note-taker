// Dependencies:
const express = require('express');
const path = require('path');
const fs = require('fs');
// Use ShortUniqueId to create a unique id for each note
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId();

// Load Data
let noteData = require('./db/db.json');


// Sets up the express App:
const app = express();

// Sets up initial port for our listener.
const PORT = process.env.PORT || 3030;

// Middleware: set up to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets express app to serve static assets directly
app.use(express.static('public'));

// API Routes:
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        };
    });
});

app.post('/api/notes', (req, res) => {
    req.body.id = uid();
    noteData.push(req.body);
    fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(noteData), (err) => {
        if (err) {
            console.log(err)
        } else {
            res.send(noteData);
        };
    });
});

app.delete('api/notes/:id', (req, res) => {
    let deleteId = req.params.id;
    fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let newData = data.filter({ id: deleteId });
        };
    });
    console.log(newData);
    fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(newData), (err) => {
            if (err) {
                console.log(err);
            } else {
                res.send(newData);
            };
    });
});


// HTML GET Routes: handles when users "visit" a page.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// // If no matching route is found default to home
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


// Starts server to begin listening:
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));