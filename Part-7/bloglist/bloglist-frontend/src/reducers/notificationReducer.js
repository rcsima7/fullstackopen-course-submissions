const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'NOTEON':
        return state = action.data
      case 'NOTEOFF':
        return state = null
      default:
        return state
    }
  }

  export const addNotification = (content) => {
      return {
          type: 'NOTEON',
          data: content
      }
  }

  export const deleteNotification = () => {
      return {
          type: 'NOTEOFF'
      }
  }

  export default notificationReducer