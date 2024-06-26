import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getOrder from "../api/getOrder";
import { Each } from "../components/Each";
import Product from "../components/Product";
import TextHeader from "../components/TextHeader";
import { createAddressDetail, rupiah } from "../utils";
import Loading from "../components/Loading";
import NotFound from "./error/NotFound";
import Card from "../components/Card";

export default function Order() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const image = order.order_items
    ? order?.order_items[0]?.product?.upload?.image
    : "";
  const order_items = order.order_items ? order?.order_items : [];
  const payment = order.payment ? order.payment : [];
  const address = order.address ? order.address : [];
  const user = order.user ? order.user : [];

  const PaymentStatus = () => {
    let badgeColor = "primary";
    if (payment.payment_status == "completed") badgeColor = "success";
    if (payment.payment_status == "pending") badgeColor = "warning";
    if (payment.payment_status == "cancelled") badgeColor = "info";
    if (payment.payment_status == "failed") badgeColor = "danger";
    return (
      <div className={`badge badge-${badgeColor}`}>
        {payment.payment_status}
      </div>
    );
  };

  useEffect(() => {
    setLoading(true);
    getOrder(id)
      .then((res) => {
        setLoading(false);
        setOrder(res.order);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <div>
      <TextHeader>Details Order</TextHeader>
      <h2 className="text-sm font-bold ml-4">ID: {id}</h2>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
        <Card className={`w-full`} title={"Shipping Address"}>
          <h4 className="text-lg font-bold ml-2">{address.address_title}</h4>
          <address className="ml-2">
            {createAddressDetail(address, user)}
          </address>
        </Card>
        <div className="card w-full lg:card-side bg-base-200 shadow-xl">
          <figure>
            <img src={image} alt="Album" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Status: {order.order_status}</h2>
            <p>Order Date: {new Date(order.created_at).toLocaleDateString()}</p>
            <p>Shipping Address: {order.shipping_address}</p>
            <p>Shipping Cost: {rupiah(order.shipping_cost)}</p>
            <p>Payment Method: {order.payment_method}</p>
            <p>Total Product: {order_items.length}</p>
            <p>Total: {rupiah(order.total_price)}</p>

            {/* <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div> */}
          </div>
        </div>
        <div className="card w-full lg:card-side bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Payment Status <PaymentStatus />
            </h2>
            <p>
              {payment.payment_status == "completed"
                ? `Payment Success: ${new Date(
                    payment.updated_at
                  ).toLocaleDateString()}`
                : `Payment Created: ${new Date(
                    payment.created_at
                  ).toLocaleDateString()}`}
            </p>
            <p>Invoice: {payment.invoice_number}</p>

            <div className="card-actions justify-center mt-2">
              <button className="btn btn-primary px-8">See Invoice</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold mt-6 mb-4">Products</h1>
        <div className="grid grid-cols-2 gap-4">
          <Each
            of={order_items}
            render={(item) => <Product productDetail={item.product} />}
          />
        </div>
      </div>
    </div>
  );
}
