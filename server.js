const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

const PORT = process.env.PORT || 3001;
const app = express();

const readFromFile = util.promisify(fs.readFile);
const writeFromFile = util.promisify(fs.writeFile);



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

//GET request
app.get('/api/notes', function(req, res) {
    readFromFile("./db/db.json", "utf8").then(function(data){
      console.log (data);
notes = [].concat(JSON.parse(data))
res.json(notes);
    })
});

//POST request
app.post('/api/notes', function(req,res){
  const note = req.body;
  readFromFile('./db/db.json', 'utf8').then(function(data){
    const noted = [].concat(JSON.parse(data));
    note.id = noted.length + 1
    noted.push(note);
    return noted
  }).then(function(noted){
    writeFromFile('./db/db.json', JSON.stringify(noted))
    res.json(note);
  })
});


//DELETE request
app.delete('/api/notes/:id', function(req,res){
  const deleteNow = parseInt(req.params.id);
  readFromFile('./db/db.json', 'utf8').then(function(data){
    const noted = [].concat(JSON.parse(data));
    const updatedNote = []
    for (let i = 0; i<noted.length; i++) {
      if(deleteNow !== noted[i].id) {
        updatedNote.push(noted[i])
      }
    }
    return updatedNote
  }).then(function(noted){
    writeFromFile("./db/db.json", JSON.stringify(noted))
    res.send('note deleted')
  })
} )

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
