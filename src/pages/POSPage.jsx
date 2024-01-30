import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ComponentToPrint } from "../components/ComponentToPrint";
import { useReactToPrint } from "react-to-print";
import { fetchDataProduct, fetchDataProductFromFirebase } from "../store/api";
import { useCart } from "../store/CartContext";
import { Carousel, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function POSPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [cart, setCart] = useState([]);
  // const [totalAmount, setTotalAmount] = useState(0);

  const { cartState, dispatch } = useCart();
  const { cart, totalAmount } = cartState;

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const result = await fetchDataProduct();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const addProductToCart = async (product) => {
  //   // check if the adding product exist
  //   let findProductInCart = await cart.find((i) => {
  //     return i.id === product.id;
  //   });

  //   if (findProductInCart) {
  //     let newCart = [];
  //     let newItem;

  //     cart.forEach((cartItem) => {
  //       if (cartItem.id === product.id) {
  //         newItem = {
  //           ...cartItem,
  //           quantity: cartItem.quantity + 1,
  //           totalAmount: cartItem.price * (cartItem.quantity + 1),
  //         };
  //         newCart.push(newItem);
  //       } else {
  //         newCart.push(cartItem);
  //       }
  //     });

  //     setCart(newCart);
  //     toast(`Added ${newItem.name} to cart`, toastOptions);
  //   } else {
  //     let addingProduct = {
  //       ...product,
  //       quantity: 1,
  //       totalAmount: product.price,
  //     };
  //     setCart([...cart, addingProduct]);
  //     toast(`Added ${product.name} to cart`, toastOptions);
  //   }
  // };

  // const removeProduct = async (product) => {
  //   const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
  //   setCart(newCart);
  // };

  const addProductToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast(`Added ${product.name} to cart`, toastOptions);
  };

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

  useEffect(() => {
    fetchProducts();
  }, []);

  // useEffect(() => {
  //   let newTotalAmount = 0;
  //   cart.forEach((icart) => {
  //     newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
  //   });
  //   setTotalAmount(newTotalAmount);
  // }, [cart]);

  const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  const chunkedProducts = chunkArray(products.slice(0, 6), 3);

  return (
    <div className="row">
      <div className="col-lg-12">
        <style>
          {`
            .carousel-control-prev, .carousel-control-next {
              top: 50%;
              transform: translateY(-50%);
            }
          `}
        </style>
        {isLoading ? (
          "Loading"
        ) : (
          <>
            <Carousel indicators={false} className="d-md-none">
              {" "}
              {/* Hide on desktop */}
              {products.slice(0, 6).map((product, index) => (
                <Carousel.Item key={index}>
                  <div className="d-flex justify-content-around">
                    <Card key={product.id} style={{ width: "18rem" }}>
                      <Card.Img variant="top" src={product.image} alt={product.name} />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <div className="d-flex justify-content-between">
                          <Card.Text>฿{product.price}</Card.Text>
                          <Button variant="primary" onClick={() => addProductToCart(product)}>
                            <i className="fas fa-shopping-cart"></i> Add to Cart
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>

            <Carousel indicators={false} className="d-none d-md-block">
              {" "}
              {/* Hide on mobile */}
              {chunkedProducts.map((chunk, index) => (
                <Carousel.Item key={index}>
                  <div className="d-flex justify-content-around">
                    {chunk.map((product) => (
                      <Card key={product.id} style={{ width: "18rem" }}>
                        <Card.Img variant="top" src={product.image} alt={product.name} />
                        <Card.Body>
                          <Card.Title>{product.name}</Card.Title>
                          <div className="d-flex justify-content-between">
                            <Card.Text>฿{product.price}</Card.Text>
                            <Button variant="primary" onClick={() => addProductToCart(product)}>
                              <i className="fas fa-shopping-cart"></i> Add to Cart
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>

            {/* Product cards */}
            <div className="row mt-4">
              {products.slice(0).map((product, key) => (
                <div key={key} className="col-lg-4 mb-4">
                  <div className="pos-item px-3 text-center border">
                    <img src={product.image} className="img-fluid" alt={product.name} />
                    <h4 className="mt-2">{product.name}</h4>
                    <div className="d-flex justify-content-between">
                      <p>฿{product.price}</p>
                      <button className="btn btn-primary" onClick={() => addProductToCart(product)}>
                        <i className="fas fa-shopping-cart"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {/* <div className="col-lg-4">
        <div style={{ display: "none" }}>
          <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} />
        </div>
        <div className="table-responsive bg-dark">
          <table className="table table-responsive table-dark table-hover">
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
          <h2 className="px-2 text-white">Total Amount: ${totalAmount}</h2>
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
      </div> */}
    </div>
  );
}

export default POSPage;
