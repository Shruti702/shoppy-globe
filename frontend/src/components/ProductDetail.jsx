import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductDetail = () => {
  const { id } = useParams(); //Get the 'id' parameter from the URL.
  //Define state for the product data and loading status.
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Fetch data when the component mounts or 'id' changes.
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data); //Store fetched data in state.
      } catch(error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false); //Stops loading spinner.
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div>Loading details...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
        {/*Basic rendering of the fetched data.*/}
      <button onClick={() => navigate(-1)} className="back-btn">Back</button>
      <div className="detail-container">
        {/*Render product image with lazy loading optimization.*/}
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        <div className="info">
          <h2>{product.title}</h2>
          <p className="category">{product.category}</p>
          <p className="desc">{product.description}</p>
          <p className="price">Price: ${product.price}</p>
          {/*Dispatch action to add the current product to the Redux store.*/}
          <button onClick={() => dispatch(addToCart(product))} className="add-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;