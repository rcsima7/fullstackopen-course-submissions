import axios from 'axios'
//const baseUrl = 'http://localhost:3001/persons'
// const baseUrl = 'http://localhost:3001/api/persons'
//const baseUrl = 'https://cryptic-forest-74372.herokuapp.com/api/persons'
const baseUrl = 'api/persons'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteItem = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => console.log(response))
}


export default {getAll, create, deleteItem}