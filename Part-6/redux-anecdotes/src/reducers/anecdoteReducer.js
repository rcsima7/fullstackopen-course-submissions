import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('action', action)

  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'VOTE': {
      const id = action.data.id
      const newVote = action.data.votes
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: newVote
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote)
    }
    default:
      return state
  }
}

  export const initAnecdotes = () => {
    return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      dispatch ({
        type: 'INIT_ANECDOTES',
        data: anecdotes
      })
    }
  }

  export const createAnecdote = (content) => {
    return async dispatch => {
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch({
        type: 'NEW_ANECDOTE',
        data: newAnecdote
      })
    }
  }

  export const createVote = (id) => {
    return async dispatch => {
      const currentObject = await anecdoteService.getOne(id)
      const newVotes = {
        ...currentObject,
        votes: currentObject.votes+1}
      const newObject = await anecdoteService.update(id, newVotes)
      
      dispatch({
        type: 'VOTE',
        data: newObject
      })
    }
  }

export default anecdoteReducer