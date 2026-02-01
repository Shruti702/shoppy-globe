import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  return (
    <div className="product-card">
      {/*Product Image with lazy loading for performance.*/}
      <img src={product.thumbnail} alt={product.title} loading="lazy" />
      
      {/*Product Title and Price*/}
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      
      <div className="card-actions">
        {/*Link to the Product Detail page.*/}
        <Link to={`/product/${product.id}`} className="details-btn">
          View Details
        </Link>
        
        {/*Add to Cart button.*/}
        <button className="add-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductItem;