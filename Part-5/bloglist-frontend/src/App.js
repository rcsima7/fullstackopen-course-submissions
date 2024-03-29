import React, { useState, useEffect, useRef } from 'react'
//import React, { useState, useRef } from 'react'


import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/Blogform'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
      event.preventDefault()
      try {
        const user = await loginService.login({
          username, password,
        })

        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      } catch (exception) {
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
              type="text"
              id='username'
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
        </div>

        <div>
          password
            <input
              type="password"
              id='password'
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
        </div>

       <button id="login-button" type="submit">login</button>
     </form>
  )

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`${blogObject.title} added to Bloglist`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
    catch (error) {
      setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
    // blogService
    //   .create(blogObject)
    //   .then(returnedBlog => {
    //     setBlogs(blogs.concat(returnedBlog))
    //   })
  }

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm createBlog = {addBlog} />
    </Togglable>

  )

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const logout = (() => {
    window.localStorage.clear()
    setUser(null)
    setErrorMessage(`${user.name} logged out`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  })

  return (
    <div>
      <h2>Welcome to the Blog</h2>
      <Notification message={errorMessage}/>

      {user === null ?
      loginForm() :
      <div>
      <div className='loginMessage'>{user.name} logged-in
      <button onClick={logout}>Log out</button>
      </div>

      {blogForm()}

      </div>
      }

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App