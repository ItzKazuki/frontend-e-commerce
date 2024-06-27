import http, { cookie } from '@api/http'

http.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${cookie.get('auth_token')}`
  return config
})

export default (id, data) => {
  return new Promise((resolve, reject) => {
    http
      .put(`/user/address/${id}`, JSON.stringify(data))
      .then(({ data }) => {
        resolve(data)
      })
      .catch(reject)
  })
}
