
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('body',(req,res) =>{
  JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.post('/api/persons',(request,response) =>{
    const maxId = persons.length > 0 ? Math.max(...persons.map(n=> n.id)) : 0
    const person = request.body
    person.id = maxId + 1

    if (person.content) {
      persons = persons.concat(person)
      response.json(persons)
    } else {
      response.status(400).json({
        error: 'name must be unique'
      })
    }

})

app.get('/api/persons',(request,response)=>{
    const peopleNumber = persons.length
    const time = new Date()
    response.send(`<p>Phonebook has info for ${peopleNumber} people <br></br>${time}</p>`)
    // response.json(persons)
})

app.get('/api/persons/:id', (request,response) =>{
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request,response) =>{
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})




