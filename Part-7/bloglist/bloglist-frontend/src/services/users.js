import axios from 'axios'
const baseUrl = '/api/users'

// let token = null
// const setToken = newToken => {
//     token = `bearer ${newToken}`
// }

const getAll = async () => {
  // console.log('making get request')
  const request = axios.get(baseUrl)
  const response = await request
  // console.log(response.data)
  return response.data
}

const getUser = async userObject => {
  const request = axios.get(`${baseUrl}/${userObject.id}`)
  const response = await request
  return response.data
}

export default { getAll, getUser }