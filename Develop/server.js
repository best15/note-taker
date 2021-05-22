const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8000;

const dbJson = require('./db/db.json')

//static routes to public
app.use(express.static('public'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/notes.html'));

})

app.get('/api/notes', (request, response) => {

    fs.readFile('./db/db.json', 'utf8', (error, data) => (error) ? console.log(error) : response.send(data));

});

app.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/index.html'));

})

app.post('/api/notes', (request, response) => {

    const newNote = request.body;

    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        if (error) console.error(error);
        let dbJson = JSON.parse(data);

        dbJson.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(dbJson), (err) =>
            err ? console.error(err) : console.log('Success!'));

    }

    );


})



app.listen(port, (err) => err ? console.log(err) : console.log(`Server is listening at ${port} !!`));