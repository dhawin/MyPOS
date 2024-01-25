import React from 'react'
import {Link} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainLayout({children}) {
  return (
    <div>
    <header>
      <nav className="navbar navbar-light bg-primary">
        <div className="container">
          <Link to="/" className="navbar-brand">DevPOS</Link>
          <Link to="/sales" className="navbar-brand">sales</Link>
          <Link to="/chart" className="navbar-brand">chart</Link>
          <Link to="/upload" className="navbar-brand">upload</Link>
        </div>
      </nav>
    </header>
    <main>
      <div className='container mt-3'>
        {children}
      </div>
      <ToastContainer/>
    </main>
  </div>
  )
}

export default MainLayout