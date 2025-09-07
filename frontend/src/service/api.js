import axios from 'axios'

const apiwc = axios.create({
  baseURL: 'http://192.168.1.105:3333/api/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

const api = axios.create({
  baseURL: 'http://192.168.1.105:3333/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

export {
  apiwc,
  api
}
