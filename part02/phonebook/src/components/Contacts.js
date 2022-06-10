const FilterForm = (props) => {
  return (
    <>
      <h2>Filter Contact Results</h2>
      <form>
        filter results: <input
        value={props.filter}
        onChange={props.handleFilter} />
      </form>
    </>
  )
}

const Contacts = ({ persons, filter, deleteContact }) => {
  const filtered = persons.filter(person => person.name.toLowerCase().includes(filter))
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {filtered.map(person =>
          <li key={person.id}>{person.name} {person.number} 
          <button onClick={() => deleteContact(person.id)}>Delete</button>
          </li>
        )} 
      </ul>
    </>
  )
}

export { Contacts, FilterForm }