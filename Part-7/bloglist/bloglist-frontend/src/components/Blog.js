import React, { useEffect } from 'react'
import CommentForm from './Commentform'
import { increaseLike, deleteBlogPost } from '../reducers/blogPostReducer'
import { useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { initializeBlogs } from '../reducers/blogPostReducer'

// const Blog = ({ blog }) => {
const Blog = ({ blogs }) => {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(initializeBlogs())
  // },[dispatch])

  const id = useParams().id
  const blog = blogs.find(n => n.id === id)
  console.log('blogs.find', blog)

  if (!blog) {
    console.log('blog not being rendered')
    return null
  }

  return (
  <div>
   <h2> {blog.title} </h2>
    author: {blog.author} <br/>
    likes: {blog.likes} <br/>
    {/* <button onClick={increaseLike(blog)}> */}
    <button onClick={() => dispatch(increaseLike(blog))}>
      Like</button> <br/>
    <button onClick={() => dispatch(deleteBlogPost(blog))}>
      Delete</button>
    <br/> <br/>
    <CommentForm blogObject={blog}/>
    <h3>Comments</h3>
    <ul>
      {blog.comments.map(b =>
        <li key={b.id}>
          {b.comment}
        </li>
        )
      }
    </ul>
  </div>
)}

export default Blog