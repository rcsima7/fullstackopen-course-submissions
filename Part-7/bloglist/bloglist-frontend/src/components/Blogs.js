import React from 'react'
// import Blog from './Blog'
import { Link } from "react-router-dom"


const Blogs = ({ list }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {list.map(li =>
          // <Blog key={li.id} blog={li}/>
          <li key={li.id}>
            <Link to={`/blogentries/${li.id}`}>
              {li.title}
            </Link>
          </li>
        )}
      </ul>
      
    </div>
  )
}

export default Blogs