import React, { useState } from 'react'
import {useField} from './hooks'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, Redirect, useHistory
} from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/anecdotes'>anecdotes</Link>
      <Link style={padding} to='/create'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
      <li key={anecdote.id}>
        <Link to={`/anecdotes/${anecdote.id}`}>
        {anecdote.content}
        </Link>
      </li>)}
    </ul>
  </div>
)

const Anecdote = ({anecdotes}) => {
  const id = useParams().id
  const anecdote = anecdotes.find(i => i.id === Number(id))

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>{anecdote.author}</div>
      <div>{anecdote.info}</div>
      {/* <div>Votes: {anecdote.info}</div> */}
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const Notification = ({message}) => {
  const notificationStyle = {
    color: 'purple',
    fontStyle: 'italic',
    fontSize: 16,
    border: 'solid',
    borderColor: 'purple'
  }

  if (message === null) {
    return null
  }
  
  return (
    <div className='notification' style={notificationStyle}>
      {message}
    </div>
  )
 
}

const CreateNew = (props) => {
  //const [content, setContent] = useState('')
  //const [author, setAuthor] = useState('')
  //const [info, setInfo] = useState('')
  //const [notification, setNotification] = useState('')
  const history = useHistory()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push("/anecdotes")
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content}/>
          {/* value={content.value} onChange={content.onChange} */}
        </div>
        <div>
          author
          <input name='author' {...author}/>
          {/* value={author.value} onChange={author.onChange} */}
        </div>
        <div>
          url for more info
          <input name='info' {...info}/>
          {/* value={info.value} onChange={info.onChange} */}
        </div>
        <button>create</button>
        <input 
          type='reset' onClick={() => {
          content.onClick();
          author.onClick();
          info.onClick()
        }
        }
        />
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`Anecdote added successfully! Content: ${anecdote.content}`)
    setTimeout(() => {
      setNotification(null)
    },10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification message={notification} />

      <Router>
        <Menu />

        <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route path="/anecdotes">
            <AnecdoteList anecdotes={anecdotes}/>
          </Route>
          <Route path="/create">
            <CreateNew addNew={addNew}/>
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
          </Route>
        </Switch>
      </Router>

      {/* <AnecdoteList anecdotes={anecdotes} />
      <About />
      <CreateNew addNew={addNew} /> */}
      <Footer />
    </div>
  )
}

export default App;