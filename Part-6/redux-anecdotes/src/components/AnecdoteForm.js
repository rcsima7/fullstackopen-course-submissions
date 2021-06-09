import React from 'react'
import { connect } from 'react-redux'
//import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()

const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    //dispatch(createAnecdote(content))
    //dispatch(createNotification(`Anecdote created: ${newAnecdote.content}`, 5))
    props.createAnecdote(content)
    props.createNotification(`Anecdote created: ${newAnecdote.content}`, 5)
  }

  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote"/></div>
            <button type="submit">create</button>
        </form>
    </div>
  )
}

//export default AnecdoteForm
export default connect(null, {createAnecdote,createNotification})(AnecdoteForm)
