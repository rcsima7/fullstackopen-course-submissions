import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { addUser, deleteUser } from '../reducers/userReducer'
import { addNotification, deleteNotification } from '../reducers/notificationReducer'
import { addNewBlog } from '../reducers/blogPostReducer'
import { Form, Button } from 'react-bootstrap'
import Togglable from './Togglable'
import BlogForm from './Blogform'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      // console.log('user', user)
      dispatch(addUser(JSON.stringify(user)))

      // window.localStorage.setItem(
      //   'loggedBlogappUser', JSON.stringify(user)
      // )
      window.localStorage.setItem(
        'loggedBlogappUser', users
      )
      //blogService.setToken(user.token)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // console.log(exception)
      dispatch(deleteUser())
      //setErrorMessage('Wrong credentials')
      dispatch(addNotification('Wrong credentials'))
      setTimeout(() => {
        //setErrorMessage(null)
        dispatch(deleteNotification())
      }, 5000)
    }
  }

  const login = () => (
    <Form onSubmit={handleLogin}>
        {/* <div> */}
        <Form.Group>
          <Form.Label>username:</Form.Label>
            <Form.Control
            // <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
        {/* </div> */}

        {/* <div> */}
          <Form.Label>password:</Form.Label>
            {/* <input */}
            <Form.Control
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
        {/* </div> */}
       <Button variant='primary' type='submit'>
         login
       </Button>
      </Form.Group>
     </Form>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    dispatch(addNewBlog(blogObject))
    dispatch(addNotification(`New blog added: ${blogObject.title}`))
        setTimeout(() => {
          dispatch(deleteNotification())
        }, 5000)
  }

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm createBlog = {addBlog} />
    </Togglable>
  )

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('loggedUserJSON', loggedUserJSON)
    if (loggedUserJSON !== null) {
      console.log('executing existing user')
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      dispatch(addUser(user))
      blogService.setToken(user.token)
    }
    else {console.log('false')}
  }, [])

  const logout = (() => {
    window.localStorage.clear()
    dispatch(deleteUser())
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
    {user === null ?
      login() :
      <div>
        <div className='loginMessage'>
          {user.name} logged-in
          <Button variant='primary' onClick={logout}>
            Log out
          </Button>
        </div>
      {blogForm()}
    </div>
      }
    </div>
  )
    }

export default LoginForm