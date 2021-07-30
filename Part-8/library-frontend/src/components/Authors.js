  
import React, { useState } from 'react'
import Select from 'react-select'


const Authors = (props) => {

  const [born, setBorn] = useState('')
  const [name, setName] = useState('')

  if (!props.show) {
    return null
  }
  const authors = props.authors

  const submit = async (event) => {
    event.preventDefault()
    console.log(Select.value)
    const [editAuthor] = props.changeBirthYear
    const setBornTo = born
    editAuthor({ variables: { name, setBornTo } })

    console.log(typeof(born))
    console.log('change birthyear...')

    setBorn('')
    setName('')
  }

  const options = authors.map(a => {
    return {value: a.name, label: a.name}
  })

  // const SetBornComponent = () => (
  //   Select
  // )

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    
    <h2>Set Birthyear</h2>
    
    <form onSubmit={submit}>
    {/* <div>
      name
      <input
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
    </div> */}

    <Select options={options}
      onChange={(e) => {
        setName(e.value)
        console.log(name)
      } }
      //value = {name}
    />

    <div>
      born
      <input
        value={born}
        onChange={({ target }) => setBorn(parseInt(target.value))}
      />
    </div>
    <button type='submit'>update author</button>
  </form>
</div>
    
  )
}

export default Authors
