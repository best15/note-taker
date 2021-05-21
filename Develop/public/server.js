const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));

})

app.get('/notes', (request, response) => {
    response.sendFile(path.join(__dirname, 'notes.html'));

})

app.listen(port, () => console.log(`Server is listening at ${port} !!`));