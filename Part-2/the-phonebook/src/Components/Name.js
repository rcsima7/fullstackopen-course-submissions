import React from 'react'

const Name = ({name, deleteName}) => {
    // console.log({name})
    return (
      <li>
        {name.name} {name.number}
        <button onClick={deleteName}>Delete</button>
      </li>
    )
  }

  export default Name