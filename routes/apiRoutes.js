// // Data Sources
// const path = require('path');
// const fs = require('fs');
// const noteData = require('../db/db.json');

// // Routing

// module.exports = (app) => {

//     app.get('/api/notes', (req, res) => {
//         fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send(data);
//                 console.log(data);
//             };
//         });
//     });

//     app.post('/api/notes', (req, res) => {
//         fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 req.body.id = uniqid();
//                 if (data) {
//                     notesField = JSON.parse(data);
//                 }
//                 notesField.push(req.body);
//                 fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notesField), (err) => {
//                     if (err) {console.log(err)};
//                 });
//                 res.end();
//             }
//         });
//     });
    
//     app.delete('api/notes:id', (req, res) => {
//         fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 let deleteId = req.params.id;
//                 notesField = JSON.parse(data);
//                 notesField = notesField.filter((note) => {
//                     return note.id != deleteId;
//                 });
//             };
//             fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notesField), (err) => {
//                 if (err) {console.log(err)};
//             });
//             res.end();
//         });
//     });
     


// };

