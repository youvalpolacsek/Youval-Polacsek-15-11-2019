const express = require( 'express' )
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/HeroloWeather', {useUnifiedTopology: true, useNewUrlParser: true })

const app = express()
const api = require('./api')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  next()
})

app.use('/', api)

const port = 5000
let socket = app.listen(port, () => console.log( `Running server on port ${ port }` ) )

module.exports = { app, socket }