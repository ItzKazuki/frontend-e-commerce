import { Each } from "./Each";
import { useEffect, useState } from "react";
import getPaymentChannels from "../api/getPaymentChannels";

export default function PaymentChannel({ onChange, nowSelect }) {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getPaymentChannels().then((res) => setPayments(res.payments));
  }, [setPayments]);

  const paymentIdentifier = {
    cod: "COD (Cash On Delivery)",
    qris: "QRIS",
    gopay: "Gopay",
    spay: "Shopee Pay",
  };

  return (
    <>
      {payments.length > 0 ? (
        <Each
          of={payments}
          render={(payment) => (
            <label className="label cursor-pointer w-full bg-gray-300 rounded-lg p-4">
              <span className="label-text text-gray-700">
                {paymentIdentifier[payment]}
              </span>
              <input
                type="radio"
                value={payment}
                className="radio checked:bg-red-500"
                onChange={onChange}
                checked={payment === nowSelect}
              />
            </label>
          )}
        />
      ) : (
        <p className="font-bold">Payment Method Not Found.</p>
      )}
    </>
  );
}
