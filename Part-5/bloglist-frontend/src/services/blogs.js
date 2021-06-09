import axios from 'axios'
const baseUrl = '/api/blogentries'

let token = null
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
  console.log('making get request')
  const request = axios.get(baseUrl)
  const response = await request
  console.log(response.data)
  return response.data
}

const create = async newObject => {

  const config = {
      headers: { Auhorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, create, setToken }