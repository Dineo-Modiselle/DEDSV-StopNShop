import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="md:w-3/5">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Product Info Section */}
        <div className="md:w-2/5">
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
          <div className="text-gray-700 mb-4">{product.price} €</div>

          <div className="mb-4">
            <div className="text-gray-700 uppercase text-sm mb-1">NOIX</div>
            <div className="border-b border-gray-300 py-2">
              <select className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option>CHOOSE SIZE</option>
              </select>
            </div>
          </div>

          <div className="text-gray-700 text-sm mb-4">{product.description}</div>

          <button className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
