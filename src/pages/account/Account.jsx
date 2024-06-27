import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextHeader from '../../components/TextHeader'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { createAddressDetail } from '../../utils'

export default function Account() {
  const account = localStorage.getItem('user')
  const user = JSON.parse(account)

  // find address with is_primary true
  const address = user.addresses.find((address) => address.is_primary)

  return (
    <div>
      <TextHeader>Account</TextHeader>
      <h2 className="text-sm font-bold ml-4">ID: {user.id}</h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div id="user-avatar" className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-xl font-bold mb-6">Account Picture</h1>
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.avatar_url} />
                </div>
              </div>
            </div>
            <div className="mt-6">
              {user.about && (
                <>
                  <h2 className="card-title">About</h2>
                  <p>{user.about}</p>
                </>
              )}
              <h2 className="card-title">Your Details</h2>
              <div className="ml-2 mb-4">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
              </div>
              <div className="card-actions justify-end mt-2">
                <Link to={'edit'} className="btn btn-primary">
                  Edit Account
                </Link>
                <button className="btn btn-error">Delete Account</button>
              </div>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Address</h2>
            {address ? (
              <address>{createAddressDetail(address)}</address>
            ) : (
              <Link to={'address/create'} className="btn btn-primary">
                <FontAwesomeIcon icon={faAddressCard} />
                Create Address
              </Link>
            )}
            <Link to={'address'} className="btn btn-link">
              see more address...
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
