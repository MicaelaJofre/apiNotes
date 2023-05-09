const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Conected to MongoDB')
  })
  .catch((err) => {
    console.error('Error conected to MongoDB' + err.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.logger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.handleError)

module.exports = app
