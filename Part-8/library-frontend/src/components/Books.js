import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  const [booksToShow, setBooksToShow] = useState(null)
  const [genre, setGenre] = useState(null)
  
  const books = booksToShow ? booksToShow : props.books
  const genreTitle = booksToShow ? `in genre ${genre}` : null

  const showBooks = (genreName) => {
    getBooks({variables: {genre: genreName}})
  }
    useEffect(() => {
      if (result.data) {
        setBooksToShow(result.data.allBooks)
      }
    },[result])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <h3>{genreTitle}</h3>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
        <button onClick={() => {showBooks('novel'); setGenre('novel')}}>novel</button>
        <button onClick={() => {showBooks('science'); setGenre('science')}}>science</button>
        <button onClick={() => {showBooks('research'); setGenre('research')}}>research</button>
        <button onClick={() => {showBooks('fiction'); setGenre('fiction')}}>fiction</button>
        <button onClick={() => {showBooks('crimi'); setGenre('crimi')}}>crimi</button>
        <button onClick={() => setBooksToShow(null)}>all grenres</button>
    </div>
  )
}

export default Books