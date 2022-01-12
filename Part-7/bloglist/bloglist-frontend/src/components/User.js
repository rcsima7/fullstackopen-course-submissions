import React from 'react'
import { useParams } from "react-router-dom"
// import { useDispatch } from 'react-redux'

const User = ({ users }) => {
  const id = useParams().id
  // const user = users.find(n => n.id === Number(id))
  const user = users.find(n => n.id === id)
  // const dispatch = useDispatch()
  // if (!user) {
  //   return null
  // }
  if (!user) {
    console.log('user not being rendered')
    return null
  }
  return (
    <div>
      <h2>name: {user.name}</h2>
    blogs created: {user.blogEntries.length}
    <ul>
      {user.blogEntries.map(n =>
        <li key={n.id}>{n.title}</li>
      )}
    </ul>
    {/* blogenties: {user.blogentries} <br/> */}
    {/* likes: {blog.likes} <br/> */}
    {/* <button onClick={increaseLike(blog)}> */}
    {/* <button onClick={() => dispatch(increaseLike(blog))}>
      Like</button>
    <button onClick={() => dispatch(deleteBlogPost(blog))}>
      Delete</button> */}
    <br/><br/>
  </div>
)}

export default User