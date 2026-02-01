import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  //Get the 'id' parameter from the URL.
  const { id } = useParams();
  
  //Define state for the product data and loading status.
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  //Fetch data when the component mounts or 'id' changes.
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data); //Store fetched data in state.
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false); //Stop loading spinner.
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div>Loading product details...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      {/*Basic rendering of the fetched data.*/}
      <img src={product.thumbnail} alt={product.title} />
      <div className="info">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
    </div>
  );
};

export default ProductDetail;