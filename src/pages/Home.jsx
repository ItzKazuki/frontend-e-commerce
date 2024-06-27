import getProducts from '../api/product/getProducts'
import Product from '../components/Product'
import { Each } from '../components/Each'
import { useState, useEffect } from 'react'
import TextHeader from '../components/TextHeader'
import Loading from '../components/Loading'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data.items)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [products])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <TextHeader>Our Products</TextHeader>
      <div className="grid grid-cols-2 gap-4 mt-3">
        <Each
          of={products}
          render={(item) => <Product productDetail={item} />}
        />
      </div>
    </div>
  )
}
