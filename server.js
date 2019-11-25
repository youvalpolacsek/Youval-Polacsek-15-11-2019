const express = require( 'express' )
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1/HeroloWeather', {useUnifiedTopology: true, useNewUrlParser: true })

// mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/HeroloWeather');

const app = express()
const api = require('./src/api')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'build')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  next()
})

app.use('/', api)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = 5000
let socket = app.listen(process.env.PORT ||PORT, () => console.log( `Running server on port ${ PORT }` ) )

module.exports = { app, socket }