import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    
    // Check for token
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login to add items to your cart.");
      navigate('/login');
      return;
    }

    // 1. Update Redux (Frontend UI)
    dispatch(addToCart(product));

    // 2. Update Backend (Database) - Requirement 2
    try {
      await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Send Token
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1
        })
      });
    } catch (err) {
      console.error("Failed to sync with backend cart", err);
    }
  };

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} loading="lazy" />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <div className="card-actions">
        <Link to={`/product/${product.id}`} className="details-btn">View Details</Link>
        <button onClick={handleAddToCart} className="add-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductItem;