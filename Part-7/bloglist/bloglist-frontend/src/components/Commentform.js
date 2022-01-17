import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { addNewComment, initializeBlogs } from '../reducers/blogPostReducer'

const CommentForm = ({blogObject}) => {
    const dispatch = useDispatch()
     
    console.log('blogobject', blogObject)

    const submitComment = (event) => {
        event.preventDefault()
        const commentObject = {
          comment: event.target.comment.value,
          blogEntry: blogObject.id,
        }

    dispatch(addNewComment(blogObject, commentObject))
    event.target.comment.value = ''
    }

    return (
        <div>
        {/* <form onSubmit={addBlog}> */}
        <form onSubmit={submitComment}>
        <div>
            Add Comment:
            <input
            //value={newBlog}
            type="text"
            name="comment"
            //onChange={handleBlogChange}
            />
        </div>
        <button type='submit'>submit</button>
        </form>
        </div>
        )
}

export default CommentForm