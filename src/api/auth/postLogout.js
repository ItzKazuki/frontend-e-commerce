import http from "../http";
import { cookie } from "../http";

http.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${cookie.get("auth_token")}`;
    return config;
});

export default () => {
  return new Promise((resolve, reject) => {
    http
      .post("/auth/logout")
      .then(({data}) => {
        resolve(data)
      })
      .catch(reject);
  });
};