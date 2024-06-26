import { useState } from "react";
import { cookie } from "../../api/http";
import { postLogin } from "../../api/auth";
import getAccount from "../../api/getAccount";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userLogin, setUserLogin] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) =>
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    postLogin(userLogin)
      .then((res) => {
        cookie.set("auth_token", res.token, { path: "/" });
        getAccount().then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          return navigate("/");
        });
      })
      .catch((err) => {
        setError(err.message);
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="py-24 px-10">
      <h2 className="text-4xl font-semibold mb-2 text-center">Login</h2>

      <form onSubmit={handleClick}>
        {/* Email Input */}
        <div className={`form-control w-full mt-4`}>
          <label className="label">
            <span className={"label-text text-base-content "}>Email</span>
          </label>
          <input
            name="email"
            type={"email"}
            placeholder={""}
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Input */}
        <div className={`form-control w-full mt-4`}>
          <label className="label">
            <span className={"label-text text-base-content "}>Password</span>
          </label>
          <input
            name="password"
            type={"password"}
            placeholder={""}
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>

        {/* Forgot Password Link */}
        {/* <div className="text-right text-primary">
          <a href="/forgot-password">
            <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
              Forgot Password?
            </span>
          </a>
        </div> */}

        {/* Error Message */}
        {error ? (
          <p className={`text-center  text-error mt-8`}>
            Email or Password error, try again
          </p>
        ) : (
          ""
        )}

        {/* Login Button */}
        <button type="submit" className={`btn mt-6 w-full btn-primary`}>
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Login"
          )}
        </button>

        {/* Register Link */}
        <div className="text-center mt-4">
          Dont have an account yet?{" "}
          <Link to="/register">
            <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
              Register
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

const Login = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-4 w-full max-w-5xl shadow-xl">
        <div className="grid grid-cols-1 bg-base-100 rounded-xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
