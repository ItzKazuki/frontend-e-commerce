import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import getProduct from '@api/product/getProduct'
import { CartContext } from '../context/CartContext'
import TextHeader from '@components/TextHeader'
import { rupiah } from '../utils'
import Loading from '@components/Loading'

export default function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const upload = product?.upload ? product.upload : {}

  const { addToCart, addToCheckout, removeAllItemFromCheckout } =
    useContext(CartContext)

  const cartItem = {
    id: product.id,
    name: product.product_name,
    price: product.price,
    image: upload.image,
  }

  const handleAddToCart = (e) => {
    e.preventDefault()

    return addToCart(cartItem)
  }

  const handleBuyNow = (e) => {
    e.preventDefault()
    removeAllItemFromCheckout()

    addToCheckout({ ...cartItem, quantity: 1 })
    return navigate('/checkout')
  }

  useEffect(() => {
    getProduct(id)
      .then((data) => {
        setProduct(data.product)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div>
      <TextHeader>Product Details</TextHeader>
      <div className="card lg:card-side bg-base-100 shadow-xl mt-4">
        <figure>
          <img src={upload.image} alt="Album" />
        </figure>
        <div className="card-body">
          <h1 className="line-clamp-2 text-white">
            Nama Produk: {product.product_name}
          </h1>
          <p className="text-white">{product.product_desc}</p>
          <p className="text-[16px] font-bold text-white">
            Harga: {rupiah(product.price)}
          </p>
          <p className="font-semibold">Brand: {product.brand}</p>
          <p className="">Tersisa {product.stock}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
