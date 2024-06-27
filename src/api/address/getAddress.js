import http, { cookie } from '@api/http'

http.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${cookie.get('auth_token')}`
  return config
})

export default () => {
  return new Promise((resolve, reject) => {
    http
      .get(`/user/address`)
      .then(({ data }) => {
        resolve({
          address: data.addresses,
        })
      })
      .catch(reject)
  })
}
