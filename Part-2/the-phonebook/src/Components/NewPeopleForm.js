import React from 'react'

const NewPeopleForm = (props) => {
return (
    <div>
        <h2>Add A New:</h2>
        <form onSubmit={props.onSubmitName}>
            <div>
            name: <input value={props.valueName}
            onChange={props.onChangeName}/>
            </div>
            <div>
            number: <input value={props.valueNumber}
            onChange={props.onChangeNumber}/>
            </div>
            <div>
            <button type='submit'>add</button>
            </div>
        </form>
    </div>
)}

export default NewPeopleForm