import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        if (!response.data.sizes || !Array.isArray(response.data.sizes)) {
          console.error('Invalid sizes data:', response.data.sizes);
        }

        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    const sizeInfo = product.sizes.find(s => s.size === selectedSize);
    if (!sizeInfo || sizeInfo.countInStock === 0) {
      alert('Selected size is out of stock');
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      quantity: 1
    });

    navigate('/cart');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="md:w-3/5">
          <img
            src={product.image}
            alt={product.product}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Product Info Section */}
        <div className="md:w-2/5">
          <h1 className="text-2xl font-semibold mb-2">{product.product}</h1>
          <div className="text-gray-700 mb-4">${product.price}</div>

          <div className="mb-4">
            <div className="text-gray-700 uppercase text-sm mb-1">Size</div>
            <div className="relative">
              <select
                value={selectedSize}
                onChange={handleSizeChange}
                className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded appearance-none focus:outline-none focus:border-gray-500"
              >
                <option value="">Select Size</option>
                {product.sizes && product.sizes.length > 0 ? (
                  product.sizes.map((sizeInfo) => (
                    <option
                      key={sizeInfo.size}
                      value={sizeInfo.size}
                      disabled={sizeInfo.countInStock === 0}
                    >
                      {sizeInfo.size} ({sizeInfo.countInStock} available)
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No sizes available</option>
                )}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="text-gray-700 text-sm mb-4">{product.description}</div>

          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`w-full py-2 px-4 rounded ${!selectedSize
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
              }`}
          >
            {!selectedSize ? 'SELECT SIZE' : 'ADD TO CART'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
