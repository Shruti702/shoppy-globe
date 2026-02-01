import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); //Prevents navigation if clicked on button.
    dispatch(addToCart(product));
  };

  return (
    <div className="product-card">
      {/*Product Image with lazy loading for performance.*/}
      <img src={product.thumbnail} alt={product.title} loading="lazy" />
      {/*Product Title and Price*/}
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <div className="card-actions">
        {/*Link to the Product Detail page.*/}
        <Link to={`/product/${product.id}`} className="details-btn">View Details</Link>
        {/*Add to Cart button.*/}
        <button onClick={handleAddToCart} className="add-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductItem;