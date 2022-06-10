import { useState, useEffect } from 'react'
import { Contacts, FilterForm } from './components/Contacts'
import AddForm from './components/AddForm'
import Notification from './components/Notification'
import phonebookService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  
  useEffect(() => {
    console.log("effect")
    phonebookService
    .getAll()
    .then(response => {
        console.log('promise resolved')
        setPersons(response.data)
      })
  }, [])

  const showNotification = () => {
    setTimeout(() => {
      setMessage(null)
      setError(false)
    }, 3000)
  }

  const handleAddForm = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      const notification = 'Fill all the fields!'
      setMessage(notification)
      showNotification()
      return
    }
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
        const notification = `${newName} added successfully!`
        setPersons(persons.concat(response.data))
        setMessage(notification)
        showNotification()
      })
    }
    //if contact is already on the phonebook, update it
    else if (window.confirm(confirmMsg)) {
      const updatedContact = {...contactObject, number: newNumber}
      phonebookService
      .update(updatedContact)
      .then(response => {
        const notification = `${updatedContact.name}: updated number succesfully`
        setMessage(notification)
        showNotification()
        setPersons(persons.map(person => person.name !== newName ? person : response.data))
      })
      .catch(() => {
        const notification = `Error! Update ${updatedContact.name}'s number failed`
        setError(true)
        setMessage(notification)
        showNotification()
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
        const notification = `${contactToDelete.name} deleted successfully!`
        setMessage(notification)
        showNotification()
        setPersons(persons.filter(p => p.id !== id))

      })
      .catch(() => {
        const notification = `Error! Delete ${contactToDelete.name} failed`
        setError(true)
        setMessage(notification)
        showNotification()
      })
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
      <Notification message={message} error={error}/>
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
