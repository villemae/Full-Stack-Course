import axios from 'axios'
import { useState, useEffect } from 'react'
import Search from './components/Search'
import Results from './components/Results'

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    console.log("effect")
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise resolved')
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Search search={search} handleSearch={handleSearchChange}/>
      <Results countries={countries} search={search}/>
    </div>
  )
}

export default App
