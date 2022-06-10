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


  const handleAddForm = (event) => {
    event.preventDefault()
    const confirmMsg = `${newName} is already in the phonebook,do you want to 
    replace the old number with a new one?`
    let contactObject = persons.find(person => person.name === newName)
    // if contact is not yet on the phonebook, add contact
    if (contactObject === undefined) {
      contactObject = {
        name: newName,
        number: newNumber
      }
      phonebookService
      .create(contactObject)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
    }
    //if contact is already on the phonebook, update it
    else if (window.confirm(confirmMsg)) {
      const updatedContact = {...contactObject, number: newNumber}
      phonebookService
      .update(updatedContact)
      .then(response => {
        setPersons(persons.map(person => person.name !== newName ? person : response.data))
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const deleteContact = (id) => {
    const contactToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Are you sure you want to delete ${contactToDelete.name}?`)) {
      phonebookService
      .del(contactToDelete.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => console.log("ERROR! DELETE NOT SUCCESSFUL"))
    }
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
        addContact={handleAddForm} />
      <FilterForm
        filter={filter}
        handleFilter={handleFilterChange} />
      <Contacts persons={persons} filter={filter} deleteContact={deleteContact}/>
    </div>
  )

}

export default App
