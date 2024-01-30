// CartPage.js
import React, { useRef } from "react";
import { useCart } from "../store/CartContext";
import { ComponentToPrint } from "../components/ComponentToPrint";
import { useReactToPrint } from "react-to-print";

const CartPage = () => {
  const { cartState, dispatch } = useCart();
  const { cart, totalAmount } = cartState;

  const removeProduct = (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  };

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };

  return (
    <div>
      <h1>Your Cart</h1>

      <div>
        <div style={{ display: "none" }}>
          <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} />
        </div>
        <div className="table-responsive">
          <table className="table table-responsive table-hover">
            <thead>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Price</td>
                <td>Qty</td>
                <td>Total</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {cart
                ? cart.map((cartProduct, key) => (
                    <tr key={key}>
                      <td>{cartProduct.id}</td>
                      <td>{cartProduct.name}</td>
                      <td>{cartProduct.price}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-secondary me-2"
                            onClick={() =>
                              dispatch({ type: "DECREASE_QUANTITY", payload: cartProduct })
                            }
                          >
                            -
                          </button>
                          {cartProduct.quantity}
                          <button
                            className="btn btn-sm btn-secondary ms-2"
                            onClick={() =>
                              dispatch({ type: "INCREASE_QUANTITY", payload: cartProduct })
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{cartProduct.totalAmount}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removeProduct(cartProduct)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                : "No Item in Cart"}
            </tbody>
          </table>
        </div>

        <div className="mt-3">
          {totalAmount !== 0 ? (
            <div>
              <button className="btn btn-primary" onClick={handlePrint}>
                Pay Now
              </button>
            </div>
          ) : (
            "Please add a product to the cart"
          )}
        </div>
      </div>

      <h2>Total Amount: ฿{totalAmount}</h2>
    </div>
  );
};

export default CartPage;
