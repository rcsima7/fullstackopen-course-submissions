import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onClick = () => {
        setValue('')
        console.log(value)
  }
  

  return {
    type,
    value,
    onChange,
    onClick
  }
}

// export const resetField = (currentValue) => {
//     const [value, setValue] = useState(currentValue)
//     setValue('')

//     return value
// }
