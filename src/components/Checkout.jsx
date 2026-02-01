import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../store/cartSlice';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  //State for form fields.
  const [formData, setFormData] = useState({ name: '', address: '', card: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted (Logic to be added next)");
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      
      {/*Order Summary Section .*/}
      <div className="order-summary">
        <h3>Order Summary</h3>
        {cartItems.map(item => (
            <div key={item.id}>
              <span>{item.title} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        ))}
        <div>
            <span>Total Amount</span>
            <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {/*Basic Form Structure.*/}
      <form onSubmit={handleSubmit} className="checkout-form">
        <input 
          required 
          name="name" 
          placeholder="Full Name" 
          value={formData.name}
          onChange={handleChange} 
        />
        <input 
          required 
          name="address" 
          placeholder="Shipping Address" 
          value={formData.address}
          onChange={handleChange} 
        />
        <input 
          required 
          name="card" 
          type="text" 
          placeholder="Card Number" 
          value={formData.card}
          onChange={handleChange} 
        />
        <button type="submit" className="place-order-btn">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;