import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../store/CartContext";

function MainLayout({ children }) {
  const [show, setShow] = useState(false);

  const { cartState } = useCart();
  const { cart } = cartState;

  const totalItems = cart.length;

  const toggleMenu = () => {
    setShow(!show);
  };

  const navItems = [
    // { to: "/sales", label: "sales" },
    { to: "/saleR", label: "Sale Report" },
    { to: "/saleG", label: "Sale Growth" },
    { to: "/report", label: "Report" },
  ];

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Dhawin's Shop
            </Link>

            <div className="d-flex align-items-center">
              <Link className="nav-link position-relative px-2" to="/cart">
                <i className="fas fa-shopping-cart"></i>
                {totalItems > 0 && (
                  <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={toggleMenu}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={"collapse navbar-collapse " + (show ? "show" : "")} id="navbarNav">
              <ul className="navbar-nav">
                {navItems.map((item, index) => (
                  <li className="nav-item" key={index}>
                    <Link to={item.to} className="nav-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className="container mt-3">{children}</div>
        <ToastContainer />
      </main>
    </div>
  );
}

export default MainLayout;
