import React from 'react'

const Filter = (props) => {
    console.log(props)
    return (
        <div>
        filter shown with: <input value={props.value}
        onChange={props.onChange}/>
        </div>
    )
  }

  export default Filter