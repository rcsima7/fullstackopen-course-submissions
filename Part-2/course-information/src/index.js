import React from 'react'
import ReactDOM from 'react-dom'
import Courses from './components/Courses'

const App = () => {
  const courses = [
    {
    id: 1,
    name: 'Half Stack application development',
    parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1.1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 1.2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 1.3
        }
      ]
    },
    {
      id: 2,
      name: 'Full Stack App development',
      parts: [
          {
            name: 'Advanced React',
            exercises: 5,
            id: 2.1
          },
          {
            name: 'Using event handlers',
            exercises: 17,
            id: 2.2
          },
          {
            name: 'State of minds',
            exercises: 4,
            id: 2.3
          }
        ]
      }
  ]

  return (
    <div>
      {courses.map((course) => <Courses key={course.id} course={course} />)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
