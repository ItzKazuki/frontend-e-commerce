import http from "./http";

export default () =>
  new Promise((resolve, reject) => {
    http
      .get("/payments/list")
      .then(({ data }) => resolve(data))
      .catch(reject);
  });
