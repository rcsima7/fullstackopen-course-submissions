import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState('')
    const [newAuthor, setNewAuthor] = useState('')

    const handleBlogChange = (event) => {
        setNewBlog(event.target.value)
      }
      const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
      }

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newBlog,
            author: newAuthor,
            likes: Math.random() < 0.5,
            link: 'smartly.io'
        }
        createBlog(blogObject)
        setNewBlog('')
        setNewAuthor('')
    }

    return (
    <div>
    <h2>Create a new Blog</h2>
    <form onSubmit={addBlog}>
      <div>
        title
        <input value={newBlog}
          type="text"
          name="Title"
          onChange={handleBlogChange}
        />
      </div>
      <div>
        author
        <input value={newAuthor}
          type="text"
          name="Author"
          onChange={handleAuthorChange}
        />
      </div>
      <button type='submit'>save</button>
    </form>
    </div>
    )
}

export default BlogForm
