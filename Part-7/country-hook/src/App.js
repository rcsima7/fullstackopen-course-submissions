import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  console.log(value)
  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const countryUrl = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
  
  useEffect(() => {
      axios
        .get(countryUrl)
        .then(response => {
          setCountry(response)
          console.log(countryUrl)
        })
        .catch(error => { if (error) {
          setCountry(error.response.status)
        }
        })
       },[name])
  return country
}

const Country = ({ country }) => {
  console.log('I am country', country)
  if (!country) {
    return null
  }

  if (country === 404) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data[0].name} </h3>
      <div>capital {country.data[0].capital} </div>
      <div>population {country.data[0].population}</div> 
      <img src={country.data[0].flag} height='100' alt={`flag of ${country.data[0].name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
