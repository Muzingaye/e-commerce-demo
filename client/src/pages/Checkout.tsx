import React, { useEffect, useState } from "react";
import { useCart } from "../Components/CartContext";

export const Checkout = () => {
  const {
    getCartItemsWithProducts,
    getCartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    async function loadCartItems() {
      const items = await getCartItemsWithProducts();
      setCartItems(items);
    }

    loadCartItems();
  }, [getCartItemsWithProducts]);

  useEffect(() => {
    async function loadTotal() {
      const val = await getCartTotal();
      setTotal(val);
    }
    loadTotal();
  }, [cartItems]);

  function placeOrder() {
    //TODO send this to an api.
    alert("successfull Order");
    clearCart();
  }
  return (
    <div className="page">
      <div className="container">
        <div className="page-title">
          <div className="checkout-container">
            <div className="checkout-items">
              <h2 className="checkout-section-title">Order Summary</h2>
              {cartItems.map((item) => (
                <div className="checkout-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="checkout-item-image"
                  />

                  <div className="checkout-item-details">
                    <h3 className="checkout-item-name">{item.name}</h3>
                    <p className="checkout-item price">R{item.price}</p>
                  </div>
                  <div className="checkout-item-controls">
                    <div className="quality-controls">
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quality-btn"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <p className="checkout-item total">
                      R{(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      className="btn btn-secondary btn-small"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-summary">
              <h2 className="checkout-section-title">Total</h2>
              <div className="checkout-total">
                <p className="checkout-total-label">Subtotal</p>
                {/* <p className="checkout-total-value">{total.toFixed(2)} </p> */}
              </div>

              <div className="checkout-total">
                <p className="checkout-total-label">Total:</p>
                <p className="checkout-total-value checkout-total-final">
                  {/* {total.toFixed(2)} */}R{Number(total).toFixed(2)}
                </p>
              </div>
              <button
                className="btn btn-primary btn-large btn-block"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
