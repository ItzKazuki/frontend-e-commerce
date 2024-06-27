import http from '../http'

export default (data) => {
  return new Promise((resolve, reject) => {
    http
      .post('/auth/login', JSON.stringify(data))
      .then(({ data }) => {
        resolve({
          token: data.token,
        })
      })
      .catch(reject)
  })
}
