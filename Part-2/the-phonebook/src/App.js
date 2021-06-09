import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import NewPeopleForm from './Components/NewPeopleForm'
import AllNames from './Components/AllNames'
import axios from 'axios'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  // const [ persons, setPersons ] = useState([{id: 1, name: 'Arto Hellas'},
  // {id: 2, name: 'Zeus Helios'},
  // {id: 3, name: 'Marta Zuckerberg'},
  // {id: 4, name: 'Denis Saltberg'}])

  const [ newPerson, setnewPerson ] = useState('')
  const [ newNumber, setnewNumber ] = useState('')
  const [ filterPerson, setnewFilter ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  
  useEffect(() => {
    personsService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
    // Prev version with axios
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     setPersons(response.data)
    //   })
  }, [])

  const namesToShow = persons.find((person) => person.name === filterPerson)
    ? persons.filter((person) => person.name === filterPerson)
    : persons

  const Notification = ({message}) => {
    const notificationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }
    if (message === null) {
      return null
    }
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

  const addName = (event) => {
    event.preventDefault()

    // Don't add if input is empty
    if (newPerson.length === 0) {
      window.alert('Please add a name before clicking add')
    }
    else {
    const nameObject = {
      name: newPerson,
      number: newNumber,
      // id: persons.length + 1
    }
    const nameExists = persons.filter((person) => person.name === newPerson)

    nameExists.length > 0
      ? window.alert(`${newPerson} is already added to Phonebook`)
      : personsService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setnewPerson('')
          setnewNumber('')
          setNotificationMessage(`'${returnedPerson.name}' was added to Phonebook`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000);
        })
      
      // Prev version with axios:
      // axios
      // .post('http://localhost:3001/persons', nameObject)
      // .then(response => {
      //   setPersons(persons.concat(response.data))
      //   setnewPerson('')
      //   setnewNumber('')
      // })
      // Prev version without axios:
      // : setPersons(persons.concat(nameObject))
      //   setnewPerson('')
      //   setnewNumber('')
    }
  }

  const deleteName = (id) => {
    // console.log(id)
    const personToDelete = persons.find(person => person.id === id)
    window.confirm(`Delete ${personToDelete.name} ?`)
    ? personsService
        .deleteItem(id)
        .then(
          console.log(`deleted person ${id}`),
          setPersons(persons.filter((person) => person.id !== id))
        )
    // axios
    //     .delete(`http://localhost:3001/persons/${id}`)
    //     .then(response => {
    //       console.log(`deleted person ${id}`)
    //       setPersons(persons.filter((person) => person.id !== id))
    //     })
    : console.log(`person ${id} was not deleted`)

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setnewPerson(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setnewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setnewFilter(event.target.value)
  }
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage}/>
      <Filter value={filterPerson} onChange={handleFilterChange} />
      
      <NewPeopleForm onSubmitName={addName} 
      valueName={newPerson} onChangeName={handleNameChange}
      valueNumber={newNumber} onChangeNumber={handleNumberChange} />

        {/* Debug:
        {console.log(namesToShow)}
        {console.log(filterPerson)} */}

      <AllNames namesToShow={namesToShow} deleteName={deleteName}/>
    </div>
  )
}

export default App;
