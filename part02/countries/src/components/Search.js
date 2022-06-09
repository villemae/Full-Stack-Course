const Search = (props) => {
    return (
        <>
            <h2>Search countries</h2>
            <form>
                search: <input
                value={props.search}
                onChange={props.handleSearch} />
        </form>
        </>
    )
}

export default Search