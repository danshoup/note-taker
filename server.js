// Dependencies:
const express = require('express');
const path = require('path');
const fs = require('fs');
let uniqid = require('uniqid');
// const noteData = require('./db/db.json');
let notesArr = [];

// Sets up the express App:
const app = express();
const PORT = process.env.PORT || 3030;

// Middleware:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// API Routes:
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
        err ? console.log(err): res.send(data);
    });
});


app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            req.body.id = uniqid();
            if (data) {
                notesArr = JSON.parse(data);
            }
            notesArr.push(req.body);
            fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notesArr), 'utf8', (err) => {
                if (err) {console.log(err)};
            });
            res.end();
        }
    });
});

app.delete('api/notes/:id', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let deleteId = req.params.id;
            notesArr = JSON.parse(data);
            notesArr = notesArr.filter((note) => {
                return note.id != deleteId;
            });
        };
        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notesArr), 'utf8', (err) => {
            if (err) {console.log(err)};
        });
        res.end();
    });
});


// HTML Routes: 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});


// Starts server to begin listening:
app.listen(PORT, () => console.log(`App is listening for NOTES on PORT ${PORT}`));