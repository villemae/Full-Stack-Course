
const AddForm = (props) => {
  return (
    <>
      <h2>Add new contact</h2>
      <form onSubmit={props.addContact}>
        <div>
          name: <input
          value={props.newName}
          onChange={props.handleName} />
        </div>
        <div>
          number: <input
          value={props.newNumber}
          onChange={props.handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div> 
      </form> 
    </>
  )
}

export default AddForm