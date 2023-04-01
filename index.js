const express = require('express')
const cors = require('cors')
const app = express()
const { logger, unknownEndpoint } = require('./loggerMiddleware')

app.use(cors())
app.use(express.json())
app.use(logger)

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    completed: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

app.get('/api/notes', (req, resp) => {
  resp.status(200).json(notes)
})

app.get('/api/notes/:id', (req, resp) => {
  const id = Number(req.params.id)
  const note = notes.find((note) => note.id === id)
  resp.status(200).json(note)
})

app.delete('/api/notes/:id', (req, resp) => {
  const id = Number(req.params.id)
  notes = notes.filter((note) => note.id !== id)

  resp.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
  return maxId + 1
}

app.post('/api/notes', (req, resp) => {
  const body = req.body

  if (!body.content) {
    return resp.status(400).json({
      error: 'content missing'
    })
  }
  const newNote = {
    id: generateId(),
    content: body.content,
    date: new Date(),
    completed: body.completed || false
  }

  notes = notes.concat(newNote)

  resp.status(200).json(notes)
})

app.use(unknownEndpoint)

const PORT = '3001'
app.listen(PORT, () => console.log(`El servidor se abrirá por el puerto ${PORT}`))
