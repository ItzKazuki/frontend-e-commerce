import http from '@api/http'

export default () => {
  return new Promise((resolve, reject) => {
    http
      .get(`/products`)
      .then(({ data }) => {
        resolve({
          items: data.products,
          page: data.page,
        })
      })
      .catch(reject)
  })
}
