import axios from 'axios'
import Cookies from 'universal-cookie'

export const cookie = new Cookies()

const backend = import.meta.env.VITE_APP_BACKEND;

const http = axios.create({
  baseURL: `${backend}/api/v1`,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
})

export default http
