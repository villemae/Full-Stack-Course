import axios from 'axios'
import { useState, useEffect } from 'react'
import { Contacts, FilterForm } from './components/Contacts'
import AddForm from './components/AddForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    console.log("effect")
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise resolved')
        setPersons(response.data)
      })
  }, [])


  const addContact = (event) => {
    event.preventDefault()
    if (persons.find(elem => elem.name === newName) === undefined) {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
    } else {
      alert(`${newName} is already in the phonebook`)
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
        addContact={addContact} />
      <FilterForm
        filter={filter}
        handleFilter={handleFilterChange} />
      <Contacts persons={persons} filter={filter}/>
    </div>
  )

}

export default App
