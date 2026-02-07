import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../store/cartSlice';
import { setSearchQuery } from '../store/productSlice';

const Header = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Check if user is logged in
  const token = localStorage.getItem('token');

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Delete token
    navigate('/login'); // Go to login
    window.location.reload(); // Refresh to update UI
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">ShoppyGlobe</Link>
      </div>

      <input 
        type="text" 
        placeholder="Search products..." 
        className="search-bar"
        onChange={handleSearchChange} 
      />

      <nav>
        <Link to="/">Home</Link>
        
        {/* Conditional Rendering based on Token */}
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="btn" style={{color: 'white', background:'transparent'}}>
            Logout
          </button>
        )}
        
        <Link to="/cart" className="cart-link">
          🛒 Cart <span>({itemCount})</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;