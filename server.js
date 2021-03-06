const express = require('express');
const path = require('path');
const fs = require('fs');
const nodeid = require('node-id');

const app = express();
const PORT = process.env.PORT || 8000;



//static routes to public
app.use(express.static('Develop/public'));

// Sets up the Express app to handle data parsing
app.use(express.json());

app.get('/notes', (request, response) => {
    response.sendFile(path.join(__dirname, '/Develop/public/notes.html'));

})

app.get('/api/notes', (request, response) => {

    fs.readFile('./Develop/db/db.json', 'utf8', (error, data) => (error) ? console.log(error) : response.send(data));

});

app.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, '/Develop/public/index.html'));

})

app.post('/api/notes', (request, response) => {

    const newNote = request.body;

    //append new id in new Notes
    const id = nodeid(8);
    newNote.id = id;

    //store db.json file content in a variable and add new note in the variable
    fs.readFile('./Develop/db/db.json', 'utf8', (error, data) => {
        if (error) console.error(error);
        let dbJson = JSON.parse(data);

        dbJson.push(newNote);

        //write dbJson contents in db.json file    
        fs.writeFile('./Develop/db/db.json', JSON.stringify(dbJson), (err) =>
            err ? console.error(err) : console.log('Saved in database.Success!'));

    });

    response.end();

})

app.delete('/api/notes/:id', (request, response) => {
    const deleteId = request.params.id;

    fs.readFile('./Develop/db/db.json', 'utf8', (error, data) => {
        if (error) console.error(error);
        let dbJson = JSON.parse(data);

        //Search note with given id and delete the note
        dbJson.forEach(note => {
            if (note.id == deleteId) {
                const index = dbJson.indexOf(note);
                dbJson.splice(index, 1);
            }

        });
        fs.writeFile('./Develop/db/db.json', JSON.stringify(dbJson), (err) =>
            err ? console.error(err) : console.log('Delete Success!'));
    });
    response.end();
});

app.listen(PORT, (err) => err ? console.log(err) : console.log(`Server is listening at ${PORT} !!`));