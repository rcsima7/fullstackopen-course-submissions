import React from 'react'

const Header = ({course}) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>
          {part.name} {part.exercises}
      </p>
    )
  }
  const Content = ({parts}) => {
    return (
      <div>
      {parts.map((part) => <Part key={part.id} part={part} />)}
      {/* // <Part part = {parts[0]} />
      // <Part part = {parts[1]} />
      // <Part part = {parts[2]} /> */}
      </div>
    )
  }
  
  const Total = ({parts}) => {
  
    return (
      <p>Number of exercises {
        parts.reduce((sum, part) => sum + part.exercises, 0)
        // parts[0].exercises +
        // parts[1].exercises +
        // parts[2].exercises
      }
        </p>
    )
  }
  
  const Courses = ({course}) => {
    return (
      <div>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total  parts={course.parts} />
        </div>
      )
    }

  export default Courses