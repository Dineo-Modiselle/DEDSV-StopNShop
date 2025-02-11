
import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [user, setUser] = useState(null);

  // Rest of your existing menuItems and cartItems...
  const menuItems = [
    {
      label: "WOMEN",
      href: "#women",
      submenu: ["Ready-to-Wear", "Dresses", "Shoes", "Accessories", "New Arrivals"]
    },
    {
      label: "MEN",
      href: "#men",
      submenu: ["Clothing", "Shoes", "Accessories", "Collections", "New Arrivals"]
    },
    {
      label: "BAGS",
      href: "#bags",
      submenu: ["Shoulder Bags", "Tote Bags", "Mini Bags", "Clutches", "Backpacks"]
    },
    {
      label: "JEWELRY",
      href: "#jewelry",
      submenu: ["Necklaces", "Bracelets", "Rings", "Earrings", "Collections"]
    },
    {
      label: "BEAUTY",
      href: "#beauty",
      submenu: ["Fragrance", "Makeup", "Skincare", "Accessories", "Gift Sets"]
    }
  ];

  const cartItems = [
    { name: "Classic Shoulder Bag", price: "2,890", image: "/api/placeholder/80/80" },
    { name: "Silk Blouse", price: "1,290", image: "/api/placeholder/80/80" }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    setIsNewsletterOpen(false);
    alert('Thank you for subscribing!');
    setEmail('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      // Normally you would make an API call here
      // This is a mock authentication
      if (email === 'test@example.com' && password === 'password123') {
        setIsLoggedIn(true);
        setUser({ name: 'Test User', email });
        setIsLoginOpen(false);
        // Clear form
        setEmail('');
        setPassword('');
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      setLoginError('An error occurred during login');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const UserMenu = () => (
    <div className="relative group">
      <button 
        className="p-2"
        onClick={() => isLoggedIn ? null : setIsLoginOpen(true)}
      >
        <User size={20} />
      </button>
      {isLoggedIn && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md hidden group-hover:block">
          <div className="p-4">
            <p className="text-sm font-medium mb-2">{user.email}</p>
            <ul className="space-y-2">
              <li>
                <a href="#profile" className="text-sm hover:text-gray-600">My Profile</a>
              </li>
              <li>
                <a href="#orders" className="text-sm hover:text-gray-600">My Orders</a>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <header className="relative">
      {/* Top announcement bar */}
      <div className="bg-black text-white text-center py-2 text-xs">
        <button 
          onClick={() => setIsNewsletterOpen(true)}
          className="hover:underline"
        >
          SIGN UP FOR 10% OFF YOUR FIRST ORDER
        </button>
      </div>

      {/* Main header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 transition-transform duration-300 ease-in-out hover:rotate-180"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Center logo */}
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-light tracking-widest">
                <a href="/" className="hover:opacity-80 transition-opacity">
                  DEDSV STOP N' SHOP
                </a>
              </h1>
            </div>

            {/* Right icons */}
            <div className="flex items-center space-x-4">
              <button 
                className="p-2"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={20} />
              </button>
              <UserMenu />
              <button 
                className="p-2 relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
            </div>
          </div>

          {/* Navigation menu with dropdowns - keeping your existing code */}
          {isMenuOpen && (
            <nav className="absolute left-0 right-0 bg-white z-50 border-t border-gray-200">
              {/* Your existing menu code */}
              <ul className="py-4">
                {menuItems.map((item) => (
                  <li 
                    key={item.label} 
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="text-center py-4">
                      <a 
                        href={item.href}
                        className="text-sm tracking-widest hover:text-gray-600 transition-colors duration-300"
                      >
                        {item.label}
                      </a>
                    </div>
                    
                    {activeDropdown === item.label && (
                      <div className="absolute left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
                        <ul className="py-4 px-8">
                          {item.submenu.map((subItem) => (
                            <li key={subItem} className="py-2">
                              <a 
                                href="#" 
                                className="text-sm hover:text-gray-600 transition-colors duration-300"
                              >
                                {subItem}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Login Overlay */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300">
          <div className="bg-white p-8 max-w-md w-full m-4 transform transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-light">LOGIN</h2>
              <button 
                onClick={() => {
                  setIsLoginOpen(false);
                  setLoginError('');
                }}
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleLogin}>
              {loginError && (
                <div className="mb-4 p-2 bg-red-100 text-red-600 text-sm">
                  {loginError}
                </div>
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-black py-2 mb-4 focus:outline-none"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-black py-2 mb-6 focus:outline-none"
                required
              />
              <button 
                type="submit"
                className="w-full bg-black text-white py-3 text-sm hover:bg-gray-800 transition-colors duration-300"
              >
                LOGIN
              </button>
              <div className="mt-4 text-center">
                <a href="#" className="text-sm underline hover:text-gray-600">
                  Forgot your password?
                </a>
                <p className="mt-2 text-sm">
                  Don't have an account?{' '}
                  <a href="#" className="underline hover:text-gray-600">
                    Create one
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Your existing Newsletter, Search, and Cart overlays */}
      {/* ... */}
    </header>
  );
};

export default NavBar;

