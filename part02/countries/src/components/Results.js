import { useEffect, useState } from "react"
import axios from "axios"

const CountryList = ({ countries, handleSearch }) => {
    return (
            <ul>
                {countries.map(country => 
                    <li key={country.cca2}>
                        {country.name.common} 
                        <button value={country.name.common} onClick={handleSearch}>show</button>
                    </li>)}
            </ul>
    )
}

const CountryDetails = ({ country }) => {
    const langs = Object.values(country.languages)
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

const Weather = ({ weather }) => {
    if (weather !== null) {
        return (
            <>
                <h3>Weather in {weather.name}</h3>
                <p>temperature: {weather.main.temp} °C</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon"/>
                <p>wind: {weather.wind.speed}m/s</p>
            </>
        )
    } else {
        return null
    }
}

const Country = ({ country }) => {

    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        console.log("WeatherEffect")
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
          .then(response => {
            console.log('promise resolved')
            setWeather(response.data)
          })
      }, [])
    
    return (
        <>
            <CountryDetails country={country} />
            <Weather weather={weather} />
        </>
    )
}

const Results = (props) => {

    if (props.search === '') {
        return (
            <p>Nothing to show</p>
        )
    }
    const filtered = props.countries.filter(country => 
        country.name.common.toLowerCase().includes(props.search.toLowerCase()))
    if (filtered.length === 1) {
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
            <CountryList countries={filtered} handleSearch={props.handleSearch} />
        )
    }
}

export default Results