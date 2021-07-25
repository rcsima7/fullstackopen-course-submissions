import blogService from '../services/blogs'

const blogPostReducer = (state = [], action) => {
    switch (action.type) {
      case 'NEWBLOG':
        return [...state, action.data]
      case 'INIT_BLOGS':
        return action.data
      default:
        return state
    }
  }

  export const addNewBlog = (blogObject) => {
    return async dispatch => {
      const newBlog = await blogService.create(blogObject)
      dispatch({
        type: 'NEWBLOG',
        data: newBlog
      })
    }
  }

  export const initializeBlogs = () => {
    return async dispatch => {
      const blogs = await blogService.getAll()
        dispatch({
        type: 'INIT_BLOGS',
        data: blogs,
        })
      }
    // return {
    //   type: 'INIT_BLOGS',
    //   data: blogs
    // }
  }

  export default blogPostReducer