import blogService from '../services/blogs'

const singleBlogPostReducer = (state = null, action) => {
    switch (action.type) {
      case 'GET_BLOG':
        return action.data
      // case 'INIT_BLOGS':
      //   return action.data
      // case 'ADDLIKE':
      //   return state.map(i => i.id === action.data.id ? {...i,likes: action.data.likes} : i)
      // case 'DELETE':
      //   return action.data[0] === 204
      //     ? state.filter(i => i.id !== action.data[1])
      //     : state
      // case 'NEW_COMMENT':
      //   return state.map(i => i.id === action.data.id ? {...i, comments: i.comments.push(action.data.comment)} : i)
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
      dispatch({
        type: 'NEW_COMMENT',
        data: newComment
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

  export const getBlog = (blogObject) => {
    return async dispatch => {
      const blog = await blogService.getBlog(blogObject)
        dispatch({
        type: 'GET_BLOG',
        data: blog,
        })
      }
    // return {
    //   type: 'INIT_BLOGS',
    //   data: blogs
    // }
  }

  export default singleBlogPostReducer