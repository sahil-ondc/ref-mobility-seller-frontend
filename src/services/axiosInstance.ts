import axios from 'axios'

const token: string = localStorage.getItem('accessToken') || ''

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost/api',
  headers: {
    authorization: token,
  },
})

export default instance
