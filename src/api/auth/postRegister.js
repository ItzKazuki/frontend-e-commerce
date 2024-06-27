import http from '@api/http'

export default (data) => {
  return new Promise((resolve, reject) => {
    http
      .post('/auth/register', JSON.stringify(data))
      .then(({ data }) => {
        resolve(data)
      })
      .catch(reject)
  })
}
