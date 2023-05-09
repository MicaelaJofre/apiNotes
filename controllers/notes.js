const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (req, resp) => {
  Note.find({}).then((note) => resp.json(note))
})

notesRouter.get('/:id', (req, resp, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        resp.status(200).json(note)
      } else {
        resp.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

notesRouter.post('/', (req, resp) => {
  const body = req.body

  if (!body.content || !body.title) {
    return resp.status(400).json({
      error: 'content missing'
    })
  }
  const newNote = new Note({
    title: body.title,
    content: body.content,
    important: body.important || false,
    date: new Date()
  })
  newNote.save().then((saveNote) => resp.status(201).json(saveNote))
})

notesRouter.put('/:id', (req, resp, next) => {
  const body = req.body

  const note = {
    title: body.title,
    content: body.content,
    important: body.important || false
  }

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then((updateNote) => resp.status(201).json(updateNote))
    .catch((error) => next(error))
})

notesRouter.delete('/:id', (req, resp) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => resp.status(204).end())
    .catch((error) => {
      console.log(error)
      resp.status(204).end()
    })
})

module.exports = notesRouter
