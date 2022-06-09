const Country = ({ country }) => {
    console.log(country.languages)
    const langs = Object.values(country.languages)
    console.log(langs)
    return (
        <>
            <h1>{country.name.common}</h1>
            <p>area: {country.area} km2</p>
            <p>population: {country.population}</p>
            <p>capital: {country.capital}</p>
            <h3>Languages:</h3>
            <ul>
               {langs.map(lang =>
                <li key={lang}>{lang}</li>
                )}
            </ul>
            <img 
            src={country.flags.png}
            alt='Flag of the country'/>
        </>
    )
}

const Results = (props) => {

    if (props.search === '') {
        return
    }
    const filtered = props.countries.filter(country => 
        country.name.common.toLowerCase().includes(props.search.toLowerCase()))
    if (filtered.length === 1) {
        console.log(filtered[0])
        return (
            <Country country={filtered[0]} />
        )
    }
    else if (filtered.length > 10) {
        return (
            <p>Too many matches, specify the search</p>
        )
    }
    else if ( 1 < filtered.length < 10) {
        return (
            <ul>
                {filtered.map(country => 
                    <li key={country.cca2}>
                        {country.name.common} 
                        <button value={country.name.common} onClick={props.handleSearch}>show</button>
                    </li>)}
            </ul>
        )
    }
}

export default Results