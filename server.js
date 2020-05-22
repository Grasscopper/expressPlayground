const MongoClient = require('mongodb').MongoClient
const express = require('express')
const app = express();
const port = 5000;

require('dotenv').config()
const connectionString = process.env.REACT_APP_KEY

const ObjectID = require('mongodb').ObjectID

MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
  const db = client.db('character-creation')
  const characters = db.collection('characters')
  const locations = db.collection('locations')

  app.get('/characters', (req, res) => {
    characters.find({}).toArray()
    .then((body) => {
      res.json(body)
    })
  })

  app.get("/characters/:id", (req, res) => {
    characters.find({ "_id": ObjectID(req.params.id) }).toArray()
    .then((body) => {
      res.json(body)
    })
  })

  app.listen(port, () => console.log(`Listening on port ${port}`));
})
