
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, EDIT_BIRTHYEAR } from './queries';

const App = () => {
  const [page, setPage] = useState('authors')

  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const resultCreateBook = useMutation(CREATE_BOOK, {
    refetchQueries: [
      {query: ALL_AUTHORS},
      {query: ALL_BOOKS}
    ]
  })
  const resultChangeBirthYear = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [
      {query: ALL_AUTHORS}
    ]
  })

  if (resultAuthors.loading || resultBooks.loading) {
    return <div>loading ...</div>
  }
  return (
    <div>

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

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
      />

    </div>
  )
}

export default App