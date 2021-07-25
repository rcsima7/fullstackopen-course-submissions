//import React, { useState } from 'react'
import React from 'react'

const BlogForm = ({ createBlog }) => {
    //const [newBlog, setNewBlog] = useState('')
    //const [newAuthor, setNewAuthor] = useState('')

    // const handleBlogChange = (event) => {
    //     setNewBlog(event.target.value)
    //   }
    //   const handleAuthorChange = (event) => {
    //     setNewAuthor(event.target.value)
    //   }

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
          title: event.target.title.value,
          author: event.target.author.value,
          likes: Math.random() < 0.5,
          link: 'smartly.io'
        }
        // const blogObject = {
        //     title: newBlog,
        //     author: newAuthor,
        //     likes: Math.random() < 0.5,
        //     link: 'smartly.io'
        // }
        createBlog(blogObject)
        event.target.title.value = ''
        event.target.author.value = ''
        //setNewBlog('')
        //setNewAuthor('')
    }

    return (
    <div>
    <h2>Create a new Blog</h2>
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          //value={newBlog}
          type="text"
          name="title"
          //onChange={handleBlogChange}
        />
      </div>
      <div>
        author
        <input
          //value={newAuthor}
          type="text"
          name="author"
          //onChange={handleAuthorChange}
        />
      </div>
      <button type='submit'>save</button>
    </form>
    </div>
    )
}

export default BlogForm
