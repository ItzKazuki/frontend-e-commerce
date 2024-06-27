import { Link, useParams } from 'react-router-dom'
import TextHeader from '../../components/TextHeader'
import { createAddressDetail } from '../../utils'
import { useState } from 'react'
import deleteAddress from '../../api/address/deleteAddress'
import setPrimaryAddress from '../../api/address/setPrimaryAddress'

export default function ShowAddress() {
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))
  const address = user.addresses.find((address) => address.id === id)
  const [showModal, setShowModal] = useState(false)
  const [loadingSetPrimary, setLoadingSetPrimary] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const handleDelete = () => {
    setDeleteLoading(true)
    deleteAddress(id).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.user))
      return (window.location.href = '/account')
    })
  }

  const handleSetPrimary = () => {
    setLoadingSetPrimary(true)
    setPrimaryAddress(id).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.user))
      return window.location.reload()
    })
  }

  return (
    <div>
      <TextHeader>Show Address</TextHeader>
      <p className="ml-4 mb-4">Address ID: {id}</p>
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="card w-full bg-base-200 shadow-xl">
          <div className="card-body">
            <h5 className="card-title text-lg">
              {address.address_title}{' '}
              {address.is_primary ? (
                <div className="badge badge-primary">primary</div>
              ) : (
                ''
              )}
            </h5>
            <p>{createAddressDetail(address)}</p>
            {!address.is_primary && (
              <button
                className="btn btn-primary w-full"
                onClick={handleSetPrimary}
              >
                {loadingSetPrimary ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  'Set Primary'
                )}
              </button>
            )}
          </div>
        </div>
        <div className="card w-full bg-base-200 shadow-xl">
          <div className="card-body">
            <h5 className="card-title text-xl justify-center">
              Address Detail
            </h5>
            <p>
              <span className="text-lg font-bold">Address 1:</span>{' '}
              {address.address_line1}
            </p>
            <p>
              <span className="text-lg font-bold">Address 2:</span>{' '}
              {address.address_line2}
            </p>
            <p>
              <span className="text-lg font-bold">City:</span> {address.city}
            </p>
            <p>
              <span className="text-lg font-bold">State:</span> {address.state}
            </p>
            <p>
              <span className="text-lg font-bold">Postal Code:</span>{' '}
              {address.postal_code}
            </p>
            <p>
              <span className="text-lg font-bold">Country:</span>{' '}
              {address.country}
            </p>
            <div className="card-actions justify-end">
              <Link className="btn btn-primary" to={`edit`}>
                Edit Address
              </Link>
              <button
                className="btn btn-error"
                onClick={() => setShowModal(true)}
              >
                Delete Address
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-base-300 rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="mb-4">
              This action will permanently delete the address.
            </p>
            <div className="flex justify-end">
              <button
                className="btn btn-secondary mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleDelete}>
                {deleteLoading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  'Yes, Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
