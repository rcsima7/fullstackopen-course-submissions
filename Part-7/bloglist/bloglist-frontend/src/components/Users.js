import React from 'react'
import { Link } from "react-router-dom"

// import User from './User'
// import { useParams } from "react-router-dom"

const Users = ({ list }) => {
  // const id = useParams().id
  // const selectedUser = list.find(n => n.id === Number(id))
  // const user0 = list[0]
  // const user0Id = user0.id
  // const idType = typeof(list[0].id)
  // const users = id ? selectedUser : list
  // console.log('id', id)
  // console.log('id type', typeof(id))
  // console.log('mongo id type', idType)
  // console.log('list item', user0)
  // console.log('users', users)
  // console.log('selected user', selectedUser)
  // if (!list){
  //   return null
  // }
  // if (id && !selectedUser) {
  //   return null
  // }
  // if (!users) {
  //   return null
  // }
  // if (id && !list) {
  //   return null
  // }
  // if (id && list) {
  //   console.log('list', list[0].id)
  //   return (
  //     <div>
  //     <h2>Users</h2>
  //     <h2>{id}</h2>
  //     {list.map(li => { <h3>{li}</h3>
        // <User key={li.id} user={li}/>
      // })}
      {/* {list.find(n => n.id === Number(id)).map(li =>
        <User key={li.id} user={li}/>
      )} */}
  //   </div>
  //   )
  // }
  
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {list.map(li =>
          <li key={li.id}>
          <Link to={`/users/${li.id}`}>
            {li.name}
          </Link>
          </li>
          // <User key={li.id} user={li}/>
        )}
      </ul>
      
    </div>
  )
  // console.log('list item id', list[0].id)
}

export default Users