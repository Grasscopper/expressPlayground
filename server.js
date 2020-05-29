const MongoClient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const port = 5000

require('dotenv').config()
const connectionString = process.env.REACT_APP_KEY
var bodyParser = require("body-parser")

const ObjectID = require('mongodb').ObjectID

MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
  const db = client.db('character-creation')
  const characters = db.collection('characters')
  // const locations = db.collection('locations')

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded( {extended: true} ))

  app.get('/characters', (req, res) => {
    characters.find({}).toArray()
    .then((body) => {
      res.json(body)
    })
  })

  app.get('/characters/:id', (req, res) => {
    characters.find({ _id: ObjectID(req.params.id) }).toArray()
    .then((body) => {
      res.json(body)
    })
  })

  app.post('/characters', (req, res) => {
    const newChar = req.body.name
    const origin = req.body.origin
    const description = req.body.description
    characters.insertOne({
      name: newChar,
      origin: origin,
      description: description
    })
    .then((result) => {
      res.json({
        _id: result.insertedId,
        name: newChar,
        origin: origin,
        description: description
      })
    })
  })

  app.delete('/characters/:id', (req, res) => {
    characters.deleteOne({ _id: ObjectID(req.params.id) })
    .then(() => {
      return characters.find({}).toArray()
    })
    .then((body) => {
      res.json(body)
    })
  })

  app.put('/characters/:id', (req, res) => {
    characters.updateOne(
    { _id: ObjectID(req.params.id) },
    {
      $set: { name: req.body.name, origin: req.body.origin, description: req.body.description }
    })
    .then(() => {
      return characters.find({}).toArray()
    })
    .then((body) => {
      res.json(body)
    })
  })

  app.listen(port, () => console.log(`Listening on port ${port}`));
})
