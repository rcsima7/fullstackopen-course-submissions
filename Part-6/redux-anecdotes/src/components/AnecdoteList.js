import React from 'react'
import {connect} from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const Anecdote = ({anecdote, handleClick}) => {
    return (
        <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = (props) => {
    //const dispatch = useDispatch()
    //const anecdotes = useSelector(state => state.anecdotes)
    const anecdotes = props.anecdotes

    return (
        anecdotes.map(anecdote =>
            <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              // dispatch(createVote(anecdote.id))
              // dispatch(createNotification(`Voted for anecdote: ${anecdote.content}`, 5))
              props.createVote(anecdote.id)
              props.createNotification(`Voted for anecdote: ${anecdote.content}`, 5)
            }
            }
            />)
    )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

//export default AnecdoteList
export default connect(mapStateToProps, {createVote,createNotification})(AnecdoteList)
