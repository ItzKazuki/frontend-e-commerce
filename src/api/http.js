import axios from 'axios'
import Cookies from 'universal-cookie'

export const cookie = new Cookies()

const http = axios.create({
  baseURL: 'http://local.kazukikun.space:8000/api/v1',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
})

export default http;
