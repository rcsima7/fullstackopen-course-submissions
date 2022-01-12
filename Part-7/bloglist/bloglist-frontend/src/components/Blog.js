import React from 'react'
import { increaseLike, deleteBlogPost } from '../reducers/blogPostReducer'
import { useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"

// const Blog = ({ blog }) => {
const Blog = ({ blogs }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

  if (!blog) {
    console.log('blog not being rendered')
    return null
  }

  return (
  // <li className='blog'>
  <div>
   <h2> {blog.title} </h2>
    author: {blog.author} <br/>
    likes: {blog.likes} <br/>
    {/* <button onClick={increaseLike(blog)}> */}
    <button onClick={() => dispatch(increaseLike(blog))}>
      Like</button> <br/>
    <button onClick={() => dispatch(deleteBlogPost(blog))}>
      Delete</button>
  </div>
  // </li>
)}

export default Blog