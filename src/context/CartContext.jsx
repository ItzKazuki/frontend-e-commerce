import { createContext, useState, useEffect } from 'react'

// Buat Context
export const CartContext = createContext()

// Buat Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [checkout, setCheckout] = useState([])

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'))
    if (storedCart) {
      setCart(storedCart)
    }

    const storedCheckout = JSON.parse(localStorage.getItem('checkout'))
    if (storedCheckout) {
      setCheckout(storedCheckout)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('checkout', JSON.stringify(checkout))
  }, [checkout])

  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === product.id)
      if (itemIndex === -1) {
        return [...prevCart, { ...product, quantity: 1 }]
      } else {
        const updatedCart = [...prevCart]
        updatedCart[itemIndex].quantity++
        return updatedCart
      }
    })
  }

  const addToCheckout = (product) => {
    setCheckout((prevCheckout) => {
      const itemIndex = prevCheckout.findIndex((item) => item.id === product.id)
      if (itemIndex === -1) {
        return [...prevCheckout, { ...product }]
      } else {
        const updatedCheckout = [...prevCheckout]
        return updatedCheckout
      }
    })
  }

  const removeItemFromCheckout = (productId) => {
    setCheckout((prevCheckout) =>
      prevCheckout.filter((item) => item.id !== productId)
    )
  }

  const removeAllItemFromCheckout = () => setCheckout([])

  const increaseQuantityCheckout = (productId) => {
    setCheckout((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decreaseQuantityCheckout = (productId) => {
    setCheckout((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  const removeItemFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  const getTotalPriceCart = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalPriceCheckout = () => {
    return checkout.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        checkout,
        addToCheckout,
        removeItemFromCheckout,
        removeAllItemFromCheckout,
        addToCart,
        removeItemFromCart,
        increaseQuantity,
        decreaseQuantity,
        increaseQuantityCheckout,
        decreaseQuantityCheckout,
        getTotalPriceCart,
        getTotalPriceCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
