import http from '../http'

export default (id) => {
  return new Promise((resolve, reject) => {
    http
      .get(`/products/${id}`)
      .then(({ data }) => {
        resolve(data)
      })
      .catch(reject)
  })
}
