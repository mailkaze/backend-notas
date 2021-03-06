const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

let notes = []
// {
//   id: 1,
//   text: "hola",
//   done: false,
// }

app.get('/', (req, res) => {
  res.send('<h1>Hola mundo!</h1>')
})

app.get('/api/notes', (req, res) => {
  // enviar todas las notas
  res.json(notes)
})

app.get('/api/note/:idNote', (req, res) => {
  // enviar la nota seleccionada
  const idNote = parseInt(req.params.idNote)
  const note = notes.find(note => note.id === idNote)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.post('/api/notes', (req, res) => {
  const note = req.body
  notes.push(note)
  res.status(201).end()
})

app.put('/api/note/:idNote', (req, res) => {
  // actualizar una nota
  const idNote = parseInt(req.params.idNote)
  const newNote = req.body
  notes.forEach(note => {
    if (note.id === idNote) {
      note.id = newNote.id
      note.text = newNote.text
      note.done = newNote.done
    }
  })
  res.status(204).end()
})

app.delete('/api/note/:idNote', (req, res) => {
  // eliminar la nota seleccionada
  const idNote = parseInt(req.params.idNote)
  notes = notes.filter(note => note.id !== idNote)
  res.status(204).end()
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('servidor escuchando en puerto', PORT);
})