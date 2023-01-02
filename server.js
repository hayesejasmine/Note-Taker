const express = reqiure('express');
const path = require('path');
const api = route('./develop/db.db.json');
const fs = require ('fs');
const util = require ('util');

const PORT = 3001;
const app = express();

const readFromFile = util.promisify(fs.readFile);
const writeFromFile = util.promisify(fs.writeFile);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./develop.public'));

//GET request
app.get('/api/notes', function(req, res) {
    readFromFile("./develop/db.db.json", "utf8").then(function(data){
notes = [].concat(JSON.parse(data))
res.json(notes);
    })
});

//POST request


//DELETE request


app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, './develop/public/notes.html'))
);

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './develop/public/index.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './develop/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
