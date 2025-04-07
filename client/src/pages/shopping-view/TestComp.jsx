import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import ProductCard from '../../components/shopping-view/ProductCard';
import ProductSort from '../../components/shopping-view/ProductSort';


function TestComp() {
    const [products, setProducts] = useState([]);
    const {category} = useParams();
    const [sortOption, setSortOption] = useState('lowest');

    
    useEffect(() => {    
        axios(`https://dedsv-stopnshop-backend.onrender.com/api/products/category/${category}‍`)
            .then(res => {setProducts(res.data); console.log(res.data)})
            .catch(err=> console.error('Error:', err))
    }, [category]);

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
        {products.map(((product, id)=> <ProductCard key={id}  product={product} ></ProductCard>))}
      </div>
    </div>
  );
}

export default TestComp 