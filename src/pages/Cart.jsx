import { useEffect, useContext } from "react";
import { Each } from "../components/Each";
import { CartContext } from "../context/CartContext";
import TextHeader from "../components/TextHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { rupiah } from "../utils";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    checkout,
    addToCheckout,
    increaseQuantity,
    decreaseQuantity,
    getTotalPriceCheckout,
    removeItemFromCheckout,
    increaseQuantityCheckout,
    decreaseQuantityCheckout,
  } = useContext(CartContext);

  const handleIncrease = (e) => {
    const productId = e.target.value;
    increaseQuantity(productId);
    if (checkout) increaseQuantityCheckout(productId);
  };

  const handleDecrease = (e) => {
    const productId = e.target.value;
    decreaseQuantity(productId);
    if (checkout) decreaseQuantityCheckout(productId);
  };

  // make checkout localstorage
  const handleChangeCheckbox = (e) => {
    const productId = e.target.value;
    if (e.target.checked) {
      const product = cart.filter((item) => item.id == productId);
      addToCheckout(...product);
    } else {
      removeItemFromCheckout(productId);
    }
  };

  return (
    <div className="">
      {cart.length > 0 ? (
        <div className="min-h-[70vh]">
          <TextHeader>Cart</TextHeader>
          <div className="flex flex-col items-center justify-center gap-2 mt-4">
            <Each
              of={cart}
              render={(item) => (
                <CartItem
                  productData={item}
                  onChange={handleChangeCheckbox}
                  handleIncrease={handleIncrease}
                  handleDecrease={handleDecrease}
                />
              )}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          {/* <span className="loading loading-spinner loading-lg"></span> */}
          <h1 className="text-3xl font-bold text-red-700">Error</h1>
          <h1 className="text-2xl font-bold">Your Cart don&apos;t have any items</h1>
          <Link to={"/"} className="btn btn-primary mt-4 text-lg">
            Buy Something Here
          </Link>
        </div>
      )}
      {cart.length > 0 && (
        <div className="flex flex-col justify-center items-end">
          <div className="bg-gray-200 w-full rounded-lg p-4 flex items-center flex-wrap justify-between space-x-12">
            <span className="font-bold text-gray-700">
              Subtotal: {rupiah(getTotalPriceCheckout())}
            </span>
            <Link
              to={"/checkout"}
              className={`btn btn-primary ${
                checkout.length != 0 ? "" : "btn-disabled text-black"
              }`}
            >
              Checkout <FontAwesomeIcon icon={faCartShopping} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function CartItem({ productData, onChange, handleIncrease, handleDecrease }) {
  const { checkout } = useContext(CartContext);

  // Update checkbox state when checkout changes
  useEffect(() => {
    const isChecked = checkout.some((item) => item.id === productData.id);
    // Update the checkbox's checked state
    const checkboxElement = document.getElementById(`ajdjak-${productData.id}`);
    if (checkboxElement) {
      checkboxElement.checked = isChecked;
    }
  }, [checkout, productData.id]); // Re-run when checkout changes

  return (
    <div className="w-full bg-gray-300 rounded-lg p-4 flex items-center space-x-4 mx-4">
      <input
        type="checkbox"
        className="checkbox border-b-2 checkbox-primary"
        id={`ajdjak-${productData.id}`}
        onChange={onChange}
        value={productData.id}
        // checked={checkout.some((item) => item.id === productData.id)} // Remove this line
      />
      <img src={productData.image} className="w-12 h-12 rounded" />
      <div className="flex-1">
        <span className="font-bold text-gray-700">{productData.name}</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="bg-red-500 w-8 text-white rounded px-2 py-1 hover:bg-red-600"
          onClick={handleDecrease}
          value={productData.id}
        >
          -
        </button>
        <span className="bg-gray-200 text-gray-700 rounded px-3 py-1">
          {productData.quantity}
        </span>
        <button
          className="bg-blue-400 w-8 text-white rounded px-2 py-1 hover:bg-blue-500"
          onClick={handleIncrease}
          value={productData.id}
        >
          +
        </button>
      </div>
    </div>
  );
}
