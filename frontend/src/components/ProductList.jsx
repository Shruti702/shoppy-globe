import React from 'react';
import useFetchProducts from '../hooks/useFetchProducts';
import ProductItem from './ProductItem';
import { useSelector } from 'react-redux';
import { selectSearchQuery } from '../store/productSlice';

const ProductList = () => {
  // CHANGED: Point to your local backend
 const { data: products, loading, error } = useFetchProducts('http://localhost:5000/api/products');
  const searchQuery = useSelector(selectSearchQuery);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  // Added safety check (products might be undefined initially)
  const productArray = Array.isArray(products) ? products : [];

  const filteredProducts = productArray.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-list">
      {filteredProducts.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;