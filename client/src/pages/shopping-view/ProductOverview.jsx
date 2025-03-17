import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../components/shopping-view/ProductCard';
import ProductSort from '../../components/shopping-view/ProductSort';

function ProductOverview() {
  console.log('productOverview component start render');
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('lowest');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        console.log('response', response);
        const sortedProducts = response.data.sort((a, b) => a.price - b.price);
        setProducts(sortedProducts);
        console.log(products);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProducts();
  }, []); // Changed dependency array to []

  const handleSort = (value) => {
    const sorted = [...products];
    sorted.sort((a, b) => {
      if (value === 'lowest') {
        return a.price - b.price;
      }
      return b.price - a.price;
    });
    setProducts(sorted);
    setSortOption(value);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-8 relative z-0">
      <ProductSort
        sortOption={sortOption}
        onSortChange={handleSort}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductOverview;