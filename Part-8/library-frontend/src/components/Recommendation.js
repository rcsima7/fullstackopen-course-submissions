import { useLazyQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'

const Recommendation = (props) => {
  console.log(props)
  const [getRecommendation, result] = useLazyQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  const [booksToShow, setBooksToShow] = useState(null)

  const showBooks = (genreName) => {
    getRecommendation({variables: {genre: genreName}})
  }
  useEffect(() => {
    if (result.data) {
      setBooksToShow(result.data.allBooks)
    }
  },[result])

  if (!props.show ) {
    return null
  }

  if (result.loading ) {
    return <div>loading ...</div>
  }

  if (!props.genre) {
    return (
      <div>
      <h2>Recommendations</h2>
      <h3>'User does not have a favorite genre in database'</h3>
      </div>
    )
  }

  if (booksToShow === null) {
    return (
      <div>
      <h2>Recommendations</h2>
      <h3>{`books in your favorite genre pattern ${props.genre}`}</h3>
      <button onClick={() => showBooks(props.genre)}>Show books</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <h3>{`books in your favorite genre pattern ${props.genre}`}</h3>

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
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => showBooks(props.genre)}>Show books</button>

    </div>
  )
}

export default Recommendation