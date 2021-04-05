//const http = require('http')
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

let persons = [ 
  {   id: 1,
     name: 'HTML is easy',
     date: '2019-05-30T17:30:31.098Z',
     important: true  },
   {    id: 2,
     name: 'Browser can execute only Javascript',
     date: '2019-05-30T18:39:34.091Z',
     important: false  },
     {    id: 3,
      name: 'To delete',
      date: '2019-05-30T18:39:34.091Z',
      important: false  }
 ]

 app.get('/', (request, response) => {
   response.send('<h1>Phonebook</h1>')
 })

 app.get('/api/persons', (request, response) => {
   response.json(persons)
 })

 app.get('/info', (request, response) => {
  response.send(`
    <h2>Phonebook has info for ${persons.length} people</h1>
    <div>${new Date()}</div>
  `)
 })

 app.get('/api/persons/:id', (request, response) => {
   const id = Number(request.params.id)
   //console.log(id)
   const person = persons.find(person => {
    //console.log(person.id, typeof person.id, id, typeof id, person.id === id)
    return person.id === id
    })
   
   if (person) {
    response.json(person)
   } else {
     response.status(404).end()
   }
 })

 app.delete('/api/persons/:id', (request, response) => {
   const id = Number(request.params.id)
   persons = persons.filter(person => person.id !== id)

   response.status(204).end()
 })

 app.post('/api/persons', (request, response) => {
   const randomId = Math.floor(Math.random()*1000)
   const body = request.body
   const nameExists = persons.find((person) => person.name === body.name)

   //error handling
   if (!body.name) {
     return response.status(400).json({
       error: 'name missing'
     })
   }
   if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
    
  if (nameExists !== undefined) {
    console.log('name already exists as', nameExists)
    return response.status(400).json({
      error: 'name already exists'
   })
  }

   const person = {
     name: body.name,
     number: body.number,
     important: body.important || false,
     date: new Date(),
     id: randomId
   }
   persons = persons.concat(person)
   console.log('new person added', person)
   response.json(person)
   console.log(nameExists)
 })

//const PORT = 3001
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on ${PORT}`)