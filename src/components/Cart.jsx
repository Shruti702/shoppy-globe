import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../store/cartSlice';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
  //Access the array of cart items from the global Redux store.
  const cartItems = useSelector(selectCartItems);

  //Calculate the total cost: accumulates (price * quantity) for every item in the cart.
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  //Conditional Rendering: Show a friendly message if the cart is empty.
  if (cartItems.length === 0) return <div className="empty-cart">Your cart is empty.</div>;

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <div className="cart-list">
        {/*Iterate over the cartItems array to render a list of components.*/}
        {cartItems.map(item => (
          //Render the CartItem component for each product.
          //The 'key' prop is crucial for React's efficient list rendering.
          <CartItem key={item.id} item={item} /> 
        ))}
      </div>
      
      {/*Cart Summary Section.*/}
      <div className="cart-summary">
        {/*Display the calculated total formatted to 2 decimal places.*/}
        <h3>Total: ${total.toFixed(2)}</h3>
        
        {/*Navigation link to the Checkout page.*/}
        <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
      </div>
    </div>
  );
};

export default Cart;