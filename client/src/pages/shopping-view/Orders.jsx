import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Orders() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //console.log("Fetching user from local storage...");
   // const storedUser = localStorage.getItem('token'); //const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
   // if (!storedUser) {
     // navigate('/account/orders'); // Redirect to login if user is not found
      //return;
    //}
    //console.log("User found:", user); // Debugging log
    //setUser(user);

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
         // console.log("No token found, redirecting to login...");
          navigate('/login');
          return;
        }
    
        console.log("Fetching orders...");
        const response = await axios.get('https://dedsv-stopnshop-backend.onrender.com/api/account/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        console.log("Orders received:", response.data); // Debugging log
        setOrders(response.data); // Update state
      } catch (error) {
        console.error('Error fetching orders:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    
    

    fetchOrders();
  },[]);

  //if (loading) return <p>Loading...</p>;
  //if (!user) return null;

  const menuItems = [
    { path: '/account', label: 'Account Overview' },
    { path: '/account/orders', label: 'My Orders' },

  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 rounded-md ${
                  location.pathname === item.path
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold mb-6">My Orders</h1>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul className="space-y-2">
              {orders.map(order => (
                <div key={order._id} className="bg-white p-6 rounded-lg shadow-sm">
                  <p>Hello,{order.customerName}</p>
                  <br />
                  <p>Order ID: {order._id}</p>
                  
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                   <p>Total: €{order.totalAmount.toFixed(2)}</p> 
                  <p>Shipping address: {order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.state},{order.shippingAddress.postalCode},{order.shippingAddress.country}</p>
                  <p>Status: {order.isPaid ? 'Paid' : 'Pending Payment'}</p>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
