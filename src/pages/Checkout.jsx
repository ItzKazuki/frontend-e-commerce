import { useContext, useState } from 'react'
import TextHeader from '@components/TextHeader'
import { CartContext } from '../context/CartContext'
import { createAddressDetail, rupiah } from '../utils'
import { Each } from '@components/Each'
import { useNavigate } from 'react-router-dom'
import createOrder from '@api/order/createOrder'
import PaymentChannel from '@components/PaymentChannel'

export default function Checkout() {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const { checkout, getTotalPriceCheckout } = useContext(CartContext)
  const [loading, setLoading] = useState(false)
  const [payment, setPayment] = useState('qris')
  const handleChangePayment = (e) => setPayment(e.target.value)
  const shippingCost = 10000
  const subtotal = getTotalPriceCheckout()
  const total = subtotal + shippingCost
  let order = {
    products: JSON.stringify(checkout),
    payment_method: payment,
  }

  const address = user.addresses.find((address) => address.is_primary)

  if (!address) return (window.location.href = '/account')

  const handleClick = () => {
    setLoading(true)
    createOrder(order)
      .then((res) => {
        // if(payment == 'qris') return window.location.href = res.redirect_url;
        if (payment == 'gopay')
          return (window.location.href = res.url.gopay_app)
        // if(payment == 'cod') return window.location.href = res.redirect_url;
        return (window.location.href = res.url.redirect_url)
      })
      .catch((err) => {
        setLoading(false)
        console.error(err)
      })
  }

  return (
    <div>
      {checkout.length > 0 ? (
        <>
          <TextHeader>Checkout</TextHeader>
          <div className="flex flex-col items-center justify-center gap-3 mt-4">
            <div className="card w-full bg-neutral text-neutral-content">
              <div className="card-body">
                <h2 className="text-2xl font-bold">Shipping Address</h2>
                <p>{createAddressDetail(address)}</p>
              </div>
            </div>
            <div className="card w-full bg-neutral text-neutral-content">
              <div className="card-body">
                <h2 className="text-2xl font-bold">Invoice Details</h2>
                <p>Shipping Cost: {rupiah(shippingCost)}</p>
                <p>Customer Name: {user.name}</p>
                <p>Customer Email: {user.email}</p>
                <p>Products: {checkout.length}</p>
                <p>Subtotal: {rupiah(subtotal)}</p>
                <p>Total: {rupiah(total)}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <TextHeader>Cart</TextHeader>
            <div className="flex flex-col items-center justify-center gap-2 mt-4">
              <Each
                of={checkout}
                render={(item) => (
                  <ProductCart key={item.id} productData={item} />
                )}
              />
            </div>
          </div>
          <div className="mt-4">
            <TextHeader className={'mb-4'}>Payment Method</TextHeader>
            <div className="flex flex-col gap-2 items-center justify-center w-full">
              <PaymentChannel
                onChange={handleChangePayment}
                nowSelect={payment}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end mt-4">
            <button
              onClick={handleClick}
              className="w-[7rem] h-4rem] btn btn-primary"
            >
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                'Pay Now'
              )}
            </button>
          </div>
        </>
      ) : (
        navigate('/')
      )}
    </div>
  )
}

function ProductCart({ productData }) {
  return (
    <div className="w-full bg-gray-300 rounded-lg p-4 flex items-center space-x-4 mx-4 text-gray-700">
      <img src={productData.image} className="w-12 h-12 rounded" />
      <div className="flex-1">
        <span className="font-bold">{productData.name}</span>
      </div>
      <p>quantity: {productData.quantity}</p>
    </div>
  )
}
