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

export const sessionStore = () => {
  // check apakah cookie token masih ada atau tidak
  const userToken = cookie.get('auth_token')

  // token nya gak ada, di arahkan ke login dan hapus session nya
  if (!userToken) {
    // navigate("/auth/login", {  replace: true });
    sessionStorage.removeItem('user')
    return
  }

  // cek apakah session user data nya masih ada atau tidak
  if (sessionStorage.getItem('user')) return

  // fetch and store user account to localstorage
}

export default http
