import axios from 'axios'
const baseUrl = '/api/blogentries'

let token = null
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
  // console.log('making get request')
  const request = axios.get(baseUrl)
  const response = await request
  // console.log(response.data)
  return response.data
}

const create = async newObject => {

  const config = {
      headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async blogObject => {
  const config = {
    headers: { Authorization: token },
  }
  
  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject, config)
  console.log('put request')
  console.log(response.data)
  return response.data
}

const deleteBlog = async blogObject => {
  const config = {
    headers: { Authorization: token },
  }
  
  const response = await axios.delete(`${baseUrl}/${blogObject.id}`, config)
  // console.log('delete request')
  // console.log(response.status)
  return response.status
}

export default { getAll, getBlog, create, setToken, addLike, deleteBlog }