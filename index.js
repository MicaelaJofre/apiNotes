const express = require('express')
const app = express()

app.use(express.json())

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
  resp.json(notes)
})

app.get('/api/notes/:id', (req, resp) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  resp.json(note)
})

app.delete('/api/notes/:id', (req, resp) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)

  resp.status(204).end()
})

app.post('/api/notes',(req,resp)=>{
  const body = req.body

  if(!body.content){
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const newNote = {
    id: notes.length + 1,
    content: body.content,
    date: new Date(),
    completed: body.completed || false 
  }
  
  notes = notes.concat(newNote)

  resp.status(200).json(notes)
})

const PORT = '3001'
app.listen(PORT, () => console.log(`El servidor se abrirá por el puerto ${PORT}`))
