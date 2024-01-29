import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainLayout({ children }) {
  const [show, setShow] = useState(false);

  const toggleMenu = () => {
    setShow(!show);
  };

  const navItems = [
    // { to: "/sales", label: "sales" },
    { to: "/saleR", label: "Sale Report" },
    { to: "/saleG", label: "Sale Growth" },
    { to: "/chart", label: "chart" },
  ];

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Dhawin's Shop
            </Link>
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
