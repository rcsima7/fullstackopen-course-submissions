import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Loginform'
import Recommendation from './components/Recommendation'
import { useQuery, useMutation, useApolloClient, useLazyQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, EDIT_BIRTHYEAR, FAV_GENRE } from './queries';

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [getFavoriteGenre, favoriteGenreResult] = useLazyQuery(FAV_GENRE)
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const client = useApolloClient()

  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const resultCreateBook = useMutation(CREATE_BOOK, {
    refetchQueries: [
      {query: ALL_AUTHORS},
      {query: ALL_BOOKS},
      //{query: FAV_GENRE},
      //{query: ALL_BOOKS({variables: {genre: favoriteGenreResult.data.me.favoriteGenre}})}
    ]
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const resultChangeBirthYear = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [
      {query: ALL_AUTHORS}
    ]
  })

  const userFaveGenre = () => {
    getFavoriteGenre()
  }

  useEffect( () => {
    if (token && favoriteGenreResult.data) {
      setFavoriteGenre(favoriteGenreResult.data.me.favoriteGenre)
    }
  },[favoriteGenreResult]) // eslint-disable-line

  if (resultAuthors.loading || resultBooks.loading) {
    return <div>loading ...</div>
  }
  if (!token) {
    return (
      <div>
        <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>
        <Notify errorMessage = {errorMessage} />

        <Authors
        show={page === 'authors'}
        authors = {resultAuthors.data.allAuthors}
        changeBirthYear = {resultChangeBirthYear}
        />

        <Books
        show={page === 'books'}
        books = {resultBooks.data.allBooks}
        />

        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
          setPage={setPage}
        />
      </div>
    )
  }

  return (
    <div>

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => {setPage('recommendation'); userFaveGenre(); }}>recommendation</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => logout()}>logout</button>

      </div>

      <Notify errorMessage = {errorMessage} />

      <Authors
        show={page === 'authors'}
        authors = {resultAuthors.data.allAuthors}
        changeBirthYear = {resultChangeBirthYear}
      />

      <Books
        show={page === 'books'}
        books = {resultBooks.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        addBook = {resultCreateBook}
        setPage = {setPage}
      />

      <Recommendation
        show={page === 'recommendation'}
        genre = {favoriteGenre}
      />

    </div>
  )
}

export default App