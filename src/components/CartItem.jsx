import React from 'react';

const CartItem = ({ item }) => {
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
        <button>-</button>
        <span>{item.quantity}</span>
        <button>+</button>
      </div>
    
      {/*Remove Button*/}
      <button className="remove-btn">
        Remove
      </button>
    </div>
  );
};

export default CartItem;