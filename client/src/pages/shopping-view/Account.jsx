import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

function Account() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, orders = [] } = useAuthStore();

  useEffect(() => {

    
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve JWT token
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('"https://dedsv-stopnshop-backend.onrender.com/api/account"', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/account/orders');
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (!userData) return null;


  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-2">
            <Link to="/account" className={`block px-4 py-2 rounded-md ${location.pathname === '/account' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}>Account Overview</Link>
            <Link to="/account/orders" className={`block px-4 py-2 rounded-md ${location.pathname === '/account/orders' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}>My Orders</Link>

          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-6">Hello {user.name}</h1>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {/* Personal Information */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Personal Information</h2>
              <p className="text-gray-600">Name: {user.name}</p>
              <p className="text-gray-600">Email: {user.email}</p>
              
            </div>

            {/* Orders Section */}
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
