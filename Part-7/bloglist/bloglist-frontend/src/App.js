import React, { useEffect } from 'react'
import store from './store'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"

import { initializeBlogs, addNewComment } from './reducers/blogPostReducer'
import { initializeUsers } from './reducers/userViewReducer'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import './index.css'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
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

  // const id = useParams().id
  // const selectedUser = allUsers.find(n => n.id === Number(id))

const App = () => {
  const padding = {padding: 5}
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
   },[dispatch])

   useEffect(() => {
     dispatch(initializeUsers())
    },[dispatch])
  

  console.log(store.getState())
  const blogs = useSelector(state => state.blogs)
  const notifications = useSelector(state => state.notifications)
  // const users = useSelector(state => state.users)
  const allUsers = useSelector(state => state.allUsers)
  // const id = useParams().id
  // const selectedUser = allUsers.find(n => n.id === Number(id))


  //const [blogs, setBlogs] = useState([])
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  //const [errorMessage, setErrorMessage] = useState(null)

  // const handleLogin = async (event) => {
  //     event.preventDefault()
  //     try {
  //       const user = await loginService.login({
  //         username, password,
  //       })
  //       // console.log('user', user)
  //       dispatch(addUser(JSON.stringify(user)))

  //       // window.localStorage.setItem(
  //       //   'loggedBlogappUser', JSON.stringify(user)
  //       // )
  //       window.localStorage.setItem(
  //         'loggedBlogappUser', users
  //       )
  //       //blogService.setToken(user.token)
  //       blogService.setToken(user.token)
  //       setUser(user)
  //       setUsername('')
  //       setPassword('')
  //     } catch (exception) {
  //       // console.log(exception)
  //       dispatch(deleteUser())
  //       //setErrorMessage('Wrong credentials')
  //       dispatch(addNotification('Wrong credentials'))
  //       setTimeout(() => {
  //         //setErrorMessage(null)
  //         dispatch(deleteNotification())
  //       }, 5000)
  //     }
  //   }

  // const loginForm = () => (
  //   <form onSubmit={handleLogin}>
  //       <div>
  //         username
  //           <input
  //             type="text"
  //             value={username}
  //             name="Username"
  //             onChange={({ target }) => setUsername(target.value)}
  //           />
  //       </div>

  //       <div>
  //         password
  //           <input
  //             type="password"
  //             value={password}
  //             name="Password"
  //             onChange={({ target }) => setPassword(target.value)}
  //           />
  //       </div>

  //      <button type="submit">login</button>
  //    </form>
  // )

  // const addBlog = (blogObject) => {
  //   blogFormRef.current.toggleVisibility()

  //   dispatch(addNewBlog(blogObject))
  //   dispatch(addNotification(`New blog added: ${blogObject.title}`))
  //       setTimeout(() => {
  //         dispatch(deleteNotification())
  //       }, 5000)

    // blogService
    //   .create(blogObject)
    //   .then(returnedBlog => {
    //     //setBlogs(blogs.concat(returnedBlog))
    //     dispatch(addNewBlog(returnedBlog))
    //   })
  // }

  // const blogFormRef = useRef()
  // const blogForm = () => (
  //   <Togglable buttonLabel="new note" ref={blogFormRef}>
  //     <BlogForm createBlog = {addBlog} />
  //   </Togglable>

  // )

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  //   if (loggedUserJSON !== "null") {
  //     const user = JSON.parse(loggedUserJSON)
  //     setUser(user)
  //     dispatch(addUser(user))
  //     blogService.setToken(user.token)
  //   }
  //   else {console.log('false')}
  // }, [])

  // useEffect(() => {
  //   blogService.getAll().then(
  //     //blogs => setBlogs( blogs )
  //     blogs => dispatch(initializeBlogs(blogs))
  //   )
  // }, [dispatch])

  // const logout = (() => {
  //   window.localStorage.clear()
  //   dispatch(deleteUser())
  //   setUser(null)
  //   dispatch({ type: 'NOTEON', data: `${user.name} logged out` })
  //   //setErrorMessage(`${user.name} logged out`)
  //   setTimeout(() => {
  //     dispatch({ type: 'NOTEOFF' })
  //     //setErrorMessage(null)
  //   }, 5000)
  // })
  // const id = useParams().id
  // const id = "61d2cb74a74aa93daa6f5776"
  // const user = allUsers.find(n => n.id === Number(id))


  return (
    <div>
      <h2>Welcome to the Blog</h2>
      {/* <Notification message={store.getState()}/> */}
      <Notification message={notifications}/>

      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/blogentries">notes</Link>
          <Link style={padding} to="/users">users</Link>
        </div>
        <Switch>
          <Route path="/users/:id">
            <User users={allUsers} />
            {/* <Users list={allUsers.find(n => n.id === Number(useParams(id)))} /> */}
          </Route>
          <Route path="/blogentries/:id">
            <Blog blogs={blogs} />
          </Route>
          <Route path="/blogentries">
          {/* {<ListView headline={'blogs'} list={blogs} listItem={Blog}/>} */}
            <Blogs list={blogs}/>
          </Route>
            {/* <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )} */}
            {/* {store.getState().map(blog =>
              <Blog key={blog.id} blog={blog} />
            )} */}
            {/* {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )} */}
          
          <Route path="/users">
            <Users list={allUsers} />
            {/* <h2>users</h2>
            {allUsers.map(user =>
              <User key={user.id} user={user} />
            )} */}
          </Route>
          <Route path="/">
            <div>
            <LoginForm/>
            </div>
          </Route>
        </Switch>
        <div>
          <i>Blog app, Reka Csima 2022</i>
        </div>
      </Router>

      </div>
  )
}

// const renderApp = () => {
//   ReactDOM.render(<App />, document.getElementById('root'))
// }
// renderApp()
// store.subscribe(renderApp)

export default App