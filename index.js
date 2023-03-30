const express = require('express')
const app = express()

const notes = [
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
  resp.send(JSON.stringify(notes))
})

app.delete('/api/notes/:id', (req, resp) => {
  const { id } = Number(req.params.id)
  //const newNotes = notes.find(note=>note.id !== id)
  //notes = [...notes, newNotes]
  resp.status(204).end()
})

app.post('/api/notes',(req,resp)=>{
  const body = req.body
  // const newNote = {
  //   id: notes.length + 1,
  //   content: body.content,
  //   date: new Date(),
  //   completed: false
  // }
  // notes = [...notes, newNote]

  resp.status(200).json(notes)
})

const PORT = '3001'
app.listen(PORT, () => console.log(`El servidor se abrirá por el puerto ${PORT}`))
