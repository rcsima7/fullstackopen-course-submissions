import React, { useState, useEffect, useRef } from 'react'
//import ReactDOM from 'react-dom'
import store from './store'
import { useSelector, useDispatch } from 'react-redux'
//import { useDispatch } from 'react-redux'

import { addNotification, deleteNotification } from './reducers/notificationReducer'
import { addNewBlog, initializeBlogs } from './reducers/blogPostReducer'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/Blogform'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'

// store.subscribe(() => {
//   const storeNow = store.getState()
//   console.log('storeState: ', storeNow)
// })
//store.dispatch({ type: 'NOTEON', data: 'Hi' })

// const blogStore = createStore(blogPostReducer)
// blogStore.subscribe(() => {
//   const storeNow = blogStore.getState()
//   console.log('blogStoreState: ', storeNow)
// })
//blogStore.dispatch({ type: 'NEWBLOG', data: 'Hi' })



const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
   },[dispatch])

  const blogs = useSelector(state => state.blogs)


  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //const [errorMessage, setErrorMessage] = useState(null)

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
        //setErrorMessage('Wrong credentials')
        dispatch(addNotification('Wrong credentials'))
        setTimeout(() => {
          //setErrorMessage(null)
          dispatch(deleteNotification())
        }, 5000)
      }
    }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
        </div>

        <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
        </div>

       <button type="submit">login</button>
     </form>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    dispatch(addNewBlog(blogObject))

    // blogService
    //   .create(blogObject)
    //   .then(returnedBlog => {
    //     //setBlogs(blogs.concat(returnedBlog))
    //     dispatch(addNewBlog(returnedBlog))
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

  // useEffect(() => {
  //   blogService.getAll().then(
  //     //blogs => setBlogs( blogs )
  //     blogs => dispatch(initializeBlogs(blogs))
  //   )
  // }, [dispatch])

  const logout = (() => {
    window.localStorage.clear()
    setUser(null)
    dispatch({ type: 'NOTEON', data: `${user.name} logged out` })
    //setErrorMessage(`${user.name} logged out`)
    setTimeout(() => {
      dispatch({ type: 'NOTEOFF' })
      //setErrorMessage(null)
    }, 5000)
  })

  return (
    <div>
      <h2>Welcome to the Blog</h2>
      <Notification message={store.getState()}/>

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
      {/* {store.getState().map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} */}
      {/* {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} */}
    </div>
  )
}

// const renderApp = () => {
//   ReactDOM.render(<App />, document.getElementById('root'))
// }
// renderApp()
// store.subscribe(renderApp)

export default App