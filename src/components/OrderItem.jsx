import { Link } from 'react-router-dom'
import { formatDate, rupiah } from '../utils'

export default function OrderItem({ order }) {
  return (
    <Link
      to={`${order.id}`}
      className="w-full mx-auto bg-gray-800 text-white rounded-lg shadow-md p-4"
    >
      <div className="flex justify-between items-center border-b-[1px] pb-1 border-gray-400">
        <div>
          <div className="text-xs font-bold">Belanja</div>
          <div className="text-sm text-gray-400">
            {formatDate(order.created_at)}
          </div>
        </div>
        <span className="badge badge-success text-white">
          {order.order_status}
        </span>
      </div>
      <div className="mt-2">
        <div className="flex items-center">
          <img
            src={order.order_items[0].product.upload.image}
            alt="Product Image"
            className="w-12 h-12 rounded"
          />
          <div className="ml-4">
            <div className="text-sm">
              {order.order_items[0].product.product_name}
            </div>
            <div className="text-xs text-gray-400">
              {order.order_items.length} barang
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="mt-2">
          <div className="text-xs text-gray-400">Total Belanja</div>
          <div className="text-sm font-bold">{rupiah(order.total_price)}</div>
        </div>
        <button className="btn btn-success btn-sm mt-7 text-white">
          Beli Lagi
        </button>
      </div>
    </Link>
  )
}
