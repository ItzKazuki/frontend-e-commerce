import http, { cookie } from '../http'

http.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${cookie.get('auth_token')}`
  return config
})

export default (data) => {
  return new Promise((resolve, reject) => {
    http
      .put(`/user`, JSON.stringify(data))
      .then(({ data }) => {
        resolve(data)
      })
      .catch(reject)
  })
}
