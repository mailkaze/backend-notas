const express = require('express')

const app = express()
app.use(express.json())

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