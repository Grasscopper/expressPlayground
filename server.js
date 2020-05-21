const MongoClient = require('mongodb').MongoClient
const express = require('express');
const app = express();
const port = 5000;

require('dotenv').config()
let connectionString = process.env.REACT_APP_KEY

MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
  const db = client.db('character-creation')
  const characters = db.collection('characters')

  app.get('/characters', (req, res) => {
    console.log('Fetching characters')
    characters.distinct("name")
    .then((body) => {
      res.send(body)
    })
  });

  app.listen(port, () => console.log(`Listening on port ${port}`));
})
