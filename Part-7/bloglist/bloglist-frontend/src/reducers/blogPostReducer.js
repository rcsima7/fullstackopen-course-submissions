import blogService from '../services/blogs'

const blogPostReducer = (state = [], action) => {
    switch (action.type) {
      case 'NEWBLOG':
        return [...state, action.data]
      case 'INIT_BLOGS':
        return action.data
      case 'ADDLIKE':
        return state.map(i => i.id === action.data.id ? {...i,likes: action.data.likes} : i)
      case 'DELETE':
        return action.data[0] === 204
          ? state.filter(i => i.id !== action.data[1])
          : state
      case 'NEW_COMMENT':
        // return state.map(i => i.id === action.data.id ? {...i, comments: i.comments.push(action.data.comment)} : i)
        return state.map(i => i.id === action.data.blogEntry ? {...i, comments: [...i.comments, action.data]} : i)
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

  export const addNewComment = (blogObject, commentObject) => {
    return async dispatch => {
      const newComment = await blogService.addComment(blogObject, commentObject)
      // console.log('newComment data', newComment)
      dispatch({
        type: 'NEW_COMMENT',
        data: newComment
        // data: [newComment.comment, blogObject.id]
      })
    }
  }

  export const deleteBlogPost = (blogObject) => {
    return async dispatch => {
      const deletedStatus = await blogService.deleteBlog(blogObject)
      dispatch({
        type: 'DELETE',
        data: [deletedStatus, blogObject.id]
      })
    }
  }

  export const increaseLike = (blogObject) => {
    return async dispatch => {
      const changedBlog = await blogService.addLike({...blogObject, likes: blogObject.likes + 1})
      dispatch({
        type: 'ADDLIKE',
        data: changedBlog
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