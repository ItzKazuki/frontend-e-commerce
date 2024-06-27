import { useEffect, useState } from 'react'
import getOrders from '../../api/order/getOrders'
import { Each } from '../../components/Each'
import TextHeader from '../../components/TextHeader'
import Loading from '../../components/Loading'
import OrderItem from '../../components/OrderItem'

export default function MyOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOrders().then((data) => {
      setLoading(false)
      setOrders(data.items)
    })
  }, [orders])

  if (loading) return <Loading />

  return (
    <div>
      <TextHeader>My Orders</TextHeader>
      <div className="flex flex-col justify-center items-center gap-2 mt-4">
        <Each of={orders} render={(item) => <OrderItem order={item} />} />
      </div>
    </div>
  )
}
