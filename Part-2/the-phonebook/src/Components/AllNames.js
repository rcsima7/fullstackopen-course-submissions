import React from 'react'
import Name from './Name'

const AllNames = (props) => {
  // console.log(props.deleteName)
    return (
        <div>
        <h2>Numbers:</h2>
        <ul>
          {props.namesToShow.map(name =>
            <Name key={name.id} name={name} 
            deleteName={()=>props.deleteName(name.id)}/>
          )}
        </ul>
        </div>
    )
  }

  export default AllNames