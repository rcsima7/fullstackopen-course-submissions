const userReducer = (state = null, action) => {
    switch (action.type) {
      case 'LOGIN':
        return state = action.data
      case 'LOGOUT':
        return state = null
      default:
        return state
    }
}

export const addUser = (content) => {
  // console.log('content', content)
    return {
        type: 'LOGIN',
        data: content
    }
}

export const deleteUser = () => {
    return {
        type: 'LOGOUT'
    }
}

export default userReducer