import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../store/cartSlice';
import { setSearchQuery } from '../store/productSlice';

const Header = () => {
  //Access the current list of items in the cart from the Redux store.
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  //Calculate the total quantity of items in the cart using reduce.
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  //Event handler for the search input.
  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className="header">
    {/*Logo Section - Links back to the Home page.*/}
      <div className="logo">
        <Link to="/">ShoppyGlobe</Link>
      </div>

      {/*Search Input - Filters products based on user input.*/}
      <input 
        type="text" 
        placeholder="Search products..." 
        className="search-bar"
        onChange={handleSearchChange} 
      />

      {/*Navigation Links.*/}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart" className="cart-link">
          🛒 Cart <span>({itemCount})</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;