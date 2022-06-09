import { useState, useEffect } from 'react'
import { Contacts, FilterForm } from './components/Contacts'
import AddForm from './components/AddForm'
import phonebookService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    console.log("effect")
    phonebookService
    .getAll()
    .then(response => {
        console.log('promise resolved')
        setPersons(response.data)
      })
  }, [])


  const addContact = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) === undefined) {
      const contactObject = {
        name: newName,
        number: newNumber
      }
      phonebookService
      .create(contactObject)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
    } else {
      alert(`${newName} is already in the phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <AddForm
        handleName={handleNameChange}
        handleNumber={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        addContact={addContact} />
      <FilterForm
        filter={filter}
        handleFilter={handleFilterChange} />
      <Contacts persons={persons} filter={filter}/>
    </div>
  )

}

export default App
