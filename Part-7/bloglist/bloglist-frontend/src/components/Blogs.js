import React from 'react'
// import Blog from './Blog'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = ({ list }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
      {/* <ul> */}
        {list.map(li =>
          // <Blog key={li.id} blog={li}/>
          <tr key={li.id}>
            <td>
          {/* <li key={li.id}> */}
            <Link to={`/blogentries/${li.id}`}>
              {li.title}
            </Link>
            </td>
            </tr>
          // </li>
        )}
      {/* </ul>          */}
      </tbody>
      </Table>
    </div>
  )
}

export default Blogs