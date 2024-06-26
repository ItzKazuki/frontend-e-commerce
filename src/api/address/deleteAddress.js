import http, { cookie } from "../http";

http.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${cookie.get("auth_token")}`;
  return config;
});

export default (id) => {
  return new Promise((resolve, reject) => {
    http
      .delete(`/user/address/${id}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
};