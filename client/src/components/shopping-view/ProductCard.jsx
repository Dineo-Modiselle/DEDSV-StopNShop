import React from 'react';
import { Link } from 'react-router-dom';
function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="group block border p-4 rounded shadow overflow-hidden">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto object-cover transition-transform duration-300 transform group-hover:scale-110"
        />
      </div>
    </Link>
  );
}

export default ProductCard;
