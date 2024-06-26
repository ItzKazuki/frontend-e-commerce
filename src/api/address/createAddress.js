import http, { cookie } from "../http";

http.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${cookie.get("auth_token")}`;
  return config;
});

export default (data) => {
  return new Promise((resolve, reject) => {
    http
      .post(`/user/address`, JSON.stringify(data))
      .then(({ data }) => {
        resolve(data);
      })
      .catch(reject);
  });
};