const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

const fs = require('fs');
const { response } = require('express');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (request, response) => {
    response.sendFile(path.join(__dirname, 'notes.html'));

})

app.get('/api/notes', (request, response) => {

    fs.readFile('../db/db.json', 'utf8', (error, data) => (error) ? console.log(error) : response.send(data));

});

app.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));

})


app.listen(port, (err) => err ? console.log(err) : console.log(`Server is listening at ${port} !!`));