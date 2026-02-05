import React from 'react';
import useFetchProducts from '../hooks/useFetchProducts';
import ProductItem from './ProductItem';
import { useSelector } from 'react-redux';
import { selectSearchQuery } from '../store/productSlice';

const ProductList = () => {
  //Fetching data using custom hook.
  const { data: products, loading, error } = useFetchProducts('https://dummyjson.com/products');
  const searchQuery = useSelector(selectSearchQuery);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  //Filter products based on search query.
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-list">
      {filteredProducts.map(product => (
        //Unique key for list.
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;