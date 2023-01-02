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






app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
