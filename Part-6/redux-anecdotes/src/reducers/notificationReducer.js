const anecdoteToShow = ''

const initialStyle = {
  border: 'none',
  padding: 0,
  borderWidth: 0
}
const intialState = [anecdoteToShow, initialStyle]

const newStyle = {
  border: 'solid',
  padding: 10,
  borderWidth: 1
}

const notificationReducer = (state = intialState, action) => {
    console.log('action', action)
    //const anecdote = action.content

    switch (action.type) {

        case 'NEW_NOTIFICATION':
          console.log('note content', action.data)
          return state = [action.data, newStyle]

        case 'NO_NOTIFICATION':
          return state = intialState

        default:
          return state
    }
}

// export const createVoteNotification = (content) => {
//     return {
//       type: 'VOTE_NOTIFICATION',
//       content: content
//     }
//   }
  
  let timeOutId;
  export const createNotification = (content, second) => {

    return async dispatch => {
      await dispatch ({
        type: 'NEW_NOTIFICATION',
        data: content
      })

      clearTimeout(timeOutId)
  
      timeOutId = setTimeout(() => {
        dispatch ({
          type: 'NO_NOTIFICATION'
        })
      }, second*1000)
    }
  }

  export const resetNotification = () => {
    return {
      type: 'NO_NOTIFICATION'
    }
  }

export default notificationReducer