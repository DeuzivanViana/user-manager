import axios from 'axios';

export const api_auth = axios.create({
  withCredentials: true,
  baseURL: '192.168.1.103:3333/api/v1',
  validateStatus: status => (status >= 200 && status < 300) || status === 500
})

export const api = axios.create({
  withCredentials: true,
  baseURL: '192.168.1.103:3333/api/v1',
  validateStatus: status => (status >= 200 && status < 300) || status === 500
})