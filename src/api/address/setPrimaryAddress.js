import http, { cookie } from '@api/http'

http.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${cookie.get('auth_token')}`
  return config
})

export default (id) => {
  return new Promise((resolve, reject) => {
    http
      .post(`/user/address/set-primary/${id}`)
      .then(({ data }) => {
        resolve(data)
      })
      .catch(reject)
  })
}
