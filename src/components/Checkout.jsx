import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../store/cartSlice';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({ name: '', address: '', card: '' });
  //State for tracking errors.
  const [cardError, setCardError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //NEW: Clear error when user types.
    if (e.target.name === 'card') {
      setCardError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validation Logic.
    const cardLength = formData.card.length;
    if (cardLength < 16) {
      setCardError("Card number contains less than 16 digits.");
      return;
    } 
    if (cardLength > 16) {
      setCardError("Card number contains more than 16 digits.");
      return;
    }
    
    console.log("Validation Passed");
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      
      <div className="order-summary">
        <h3>Order Summary</h3>
        {cartItems.map(item => (
            <div key={item.id}>
              <span>{item.title} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        ))}
        <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #ddd', fontWeight: 'bold', color: '#1b4332' }}>
            <span>Total Amount</span>
            <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <input required name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
        <input required name="address" placeholder="Shipping Address" value={formData.address} onChange={handleChange} />
        
        {/*Input wrapped in a group for error styling.*/}
        <div className="form-group">
          <input 
            required 
            name="card" 
            type="text" 
            placeholder="Card Number (16 digits)" 
            value={formData.card}
            onChange={handleChange}
            className={cardError ? 'input-error' : ''}
          />
          {cardError && <span className="error-msg">{cardError}</span>}
        </div>

        <button type="submit" className="place-order-btn">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;