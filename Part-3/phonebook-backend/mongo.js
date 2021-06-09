const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
`mongodb+srv://fullstackopen:${password}@cluster0.o2sea.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
name: String,
date: Date,
number: String,
important: Boolean,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
name: name,
number: number,
date: new Date(),
important: true,
})

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(person => {
        console.log(person.name, person.number)
        })
        mongoose.connection.close()
        })
}

else if (process.argv.length > 3) {
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
        })
}