import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQtyChange = (qty) => {
    if (qty < 1) return; //Prevent going below 1.
    dispatch(updateQuantity({ id: item.id, quantity: qty }));
  };

  return (
    <div className="cart-item">
        {/*Product Thumbnail*/}
      <img src={item.thumbnail} alt={item.title} />
      {/*Title and Price*/}
      <div className="item-details">
        <h4>{item.title}</h4>
        <p>${item.price}</p>
      </div>
      {/*Quantity Controls*/}
      <div className="quantity-controls">
        <button onClick={() => handleQtyChange(item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => handleQtyChange(item.quantity + 1)}>+</button>
      </div>
       {/*Remove Button*/}
      <button 
        className="remove-btn"
        onClick={() => dispatch(removeFromCart(item.id))} 
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;