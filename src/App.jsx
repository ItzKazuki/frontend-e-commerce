import {
  Routes,
  Route,
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { Home, MyOrders, Account } from './pages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faReceipt, faUser } from '@fortawesome/free-solid-svg-icons'
import NotFound from './pages/error/NotFound'
import Login from './pages/auth/Login'
import { cookie } from './api/http'
import Order from './pages/Order'
import Product from './pages/Product'
import { postLogout } from './api/auth'
import Cart from './pages/Cart'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from './context/CartContext'
import Checkout from './pages/Checkout'
import Addresses from './pages/address/Addresses'
import CreateAddress from './pages/address/CreateAddress'
import ShowAddress from './pages/address/ShowAddress'
import EditAddress from './pages/address/EditAddress'
import Register from './pages/auth/Register'
import { rupiah } from './utils'
import EditAccount from './pages/EditAccount'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/products/:id"
        element={
          <Layout>
            <Product />
          </Layout>
        }
      />
      <Route element={<CheckAuth />}>
        <Route
          path="/account/address"
          element={
            <Layout>
              <Addresses />
            </Layout>
          }
        />
        <Route
          path="/account/address/create"
          element={
            <Layout>
              <CreateAddress />
            </Layout>
          }
        />
        <Route
          path="/account/address/:id"
          element={
            <Layout>
              <ShowAddress />
            </Layout>
          }
        />
        <Route
          path="/account/address/:id/edit"
          element={
            <Layout>
              <EditAddress />
            </Layout>
          }
        />
        <Route
          path="/checkout"
          element={
            <Layout>
              <Checkout />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
        <Route
          path="/orders"
          element={
            <Layout>
              <MyOrders />
            </Layout>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <Layout>
              <Order />
            </Layout>
          }
        />
        <Route
          path="/account"
          element={
            <Layout>
              <Account />
            </Layout>
          }
        />
        <Route
          path="/account/edit"
          element={
            <Layout>
              <EditAccount />
            </Layout>
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function CheckAuth() {
  const token = cookie.get('auth_token')
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!token || !user) return navigate('/login')
  }, [])

  return <Outlet />
  // return (window.location.href = "/login");
}

function Layout({ children }) {
  const [user, setUser] = useState({})
  const token = cookie.get('auth_token')

  // if(!user) return window.location.reload();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  if (!token) {
    localStorage.removeItem('user')
  }

  return (
    <div className="mb-20">
      <Navbar user={user} />
      <div className="my-4 mx-4 no-scrollbar">{children}</div>
      <BtmNavbar />
    </div>
  )
}

function BtmNavbar() {
  const { pathname } = useLocation()
  const path = pathname.split('/')[1]

  return (
    <div className="btm-nav">
      <Link
        to="/"
        className={
          pathname === '/' || path === 'products' || path == 'cart'
            ? 'active'
            : ''
        }
      >
        <FontAwesomeIcon icon={faHome} />
      </Link>
      <Link to={'/orders'} className={path === 'orders' ? 'active' : ''}>
        <FontAwesomeIcon icon={faReceipt} />
      </Link>
      <Link to={'/account'} className={path === 'account' ? 'active' : ''}>
        <FontAwesomeIcon icon={faUser} />
      </Link>
    </div>
  )
}

function Navbar({ user }) {
  const handleClickLogout = (e) => {
    e.preventDefault()
    postLogout()
      .then(() => {
        cookie.remove('auth_token')
        localStorage.removeItem('cart')
        localStorage.removeItem('user')
        return (window.location.href = '/login')
      })
      .catch((err) => console.error(err))
  }

  const { getTotalPriceCart, cart } = useContext(CartContext)

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          EdenShop
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cart.length}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">{cart.length} Items</span>
              <span className="text-info">
                Subtotal: {rupiah(getTotalPriceCart())}
              </span>
              <div className="card-actions">
                <Link to={'/cart'} className="btn btn-primary btn-block">
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            {user ? (
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.avatar_url}
                  />
                </div>
              </div>
            ) : (
              <div className="w-10 rounded-full">
                <FontAwesomeIcon icon={faUser} />
              </div>
            )}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {user ? (
              <>
                <li>
                  <Link to="/account">Profile</Link>
                </li>
                <li>
                  <a onClick={handleClickLogout}>Logout</a>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
