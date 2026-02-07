import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        // CHANGED: Fetch from local backend
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data); 
      } catch(error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div>Loading details...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)} className="back-btn">Back</button>
      <div className="detail-container">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        <div className="info">
          <h2>{product.title}</h2>
          <p className="category">{product.category}</p>
          <p className="desc">{product.description}</p>
          <p className="price">Price: ${product.price}</p>
          <button onClick={() => dispatch(addToCart(product))} className="add-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;