import { useState } from 'react'
import { postRegister } from '@api/auth'
import { Link, useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [userRegister, setUserRegister] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) =>
    setUserRegister({
      ...userRegister,
      [e.target.name]: e.target.value,
    })

  const handleClick = (e) => {
    e.preventDefault()
    setLoading(true)
    postRegister(userRegister)
      .then(() => {
        return navigate('/login', { replace: true })
      })
      .catch((err) => {
        console.error(err)
        setError(err.message)
        setLoading(false)
      })
  }

  return (
    <div className="py-24 px-10">
      <h2 className="text-4xl font-semibold mb-2 text-center">Register</h2>

      <form onSubmit={handleClick}>
        <div className={`form-control w-full mt-4`}>
          <label className="label">
            <span className={'label-text text-base-content '}>Name</span>
          </label>
          <input
            name="name"
            type={'text'}
            placeholder={'Your name'}
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>

        <div className={`form-control w-full mt-4`}>
          <label className="label">
            <span className={'label-text text-base-content '}>Email</span>
          </label>
          <input
            name="email"
            type={'email'}
            placeholder={'someone@yourdomain.com'}
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>

        <div className={`form-control w-full mt-4`}>
          <label className="label">
            <span className={'label-text text-base-content '}>
              Phone Number
            </span>
          </label>
          <input
            name="phone"
            type={'text'}
            placeholder={'628877665444'}
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>

        <div className={`form-control w-full mt-4`}>
          <label className="label">
            <span className={'label-text text-base-content '}>Password</span>
          </label>
          <input
            name="password"
            type={'password'}
            placeholder={'*******'}
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>

        {/* Error Message */}
        {error ? (
          <p className={`text-center  text-error mt-8`}>
            Email or Password error, try again
          </p>
        ) : (
          ''
        )}

        {/* Login Button */}
        <button type="submit" className={`btn mt-6 w-full btn-primary`}>
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            'Register'
          )}
        </button>

        {/* Register Link */}
        <div className="text-center mt-4">
          Already have an Account?{' '}
          <Link to="/login">
            <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
              Login
            </span>
          </Link>
        </div>
      </form>
    </div>
  )
}

const Register = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-4 w-full max-w-5xl shadow-xl">
        <div className="grid grid-cols-1 bg-base-100 rounded-xl">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default Register
