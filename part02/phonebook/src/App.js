import { useState } from 'react'
import { Contacts, FilterForm } from './components/Contacts'
import AddForm from './components/AddForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040111111'
    },
    {
      name: 'Pirkko Kallas',
      number: '123456789'
    },
    {
      name: 'Jukka Hellas',
      number: '0502222222'
    },
    {
      name: 'Hertta Maailma',
      number: '0100100'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
