import http, { cookie } from './http'

http.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${cookie.get('auth_token')}`
  return config
})

export default () => {
  return new Promise((resolve, reject) => {
    http
      .get(`/orders`)
      .then(({ data }) => {
        resolve({
          items: data.orders,
          page: data.page,
        })
      })
      .catch(reject)
  })
}
