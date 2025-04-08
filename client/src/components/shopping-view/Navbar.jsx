import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaBars, FaXmark, FaUser, FaCartShopping, FaChevronDown } from "react-icons/fa6";
import Logo from "../../assets/company-logo2.png";
import { useAuthStore } from "../../store/authStore.js";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const { logout, user } = useAuthStore();
  const location = useLocation();

  // Detect scroll for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out", {
      icon: '👋',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const menuItems = [
    {
      label: "WOMEN",
      path: "/category/female",
      submenu: [
        {
          title: "Clothing",
          items: [
            "Dresses",
            "Tops",
            "Skirts",
            "Pants",
            "Jackets & Coats",
            "Knitwear",
            "Suits",
            
          ],
        },
        {
          title: "Shoes",
          items: ["Boots", "Heels", "Flats", "Sneakers", "Sandals", "Loafers"],
        },
        {
          title: "Bags",
          items: [
            "Tote Bags",
            "Shoulder Bags",
            "Cross-body Bags",
            "Clutches",
            "Mini Bags",
            "Backpacks",
          ],
        },
        {
          title: "Accessories",
          items: [
            "Jewelry",
            "Belts",
            "Sunglasses",
            "Scarves",
            "Hats",
            "Gloves",
          ],
        },
        {
          title: "Collections",
          items: [
            "New Arrivals",
            "Trending Now",
            "Bestsellers",
            "Special Prices",
            "Coming Soon",
          ],
        },
      ],
    },
    {
      label: "MEN",
      path: "/category/male",
      submenu: [
        {
          title: "Clothing",
          items: [
            "Suits",
            "Shirts",
            "Pants",
            "Jeans",
            "Jackets & Coats",
            "Knitwear",
            "T-shirts",
            "Activewear",
          ],
        },
        {
          title: "Shoes",
          items: [
            "Boots",
            "Sneakers",
            "Dress Shoes",
            "Loafers",
            "Sandals",
            "Athletic",
          ],
        },
        {
          title: "Bags",
          items: [
            "Briefcases",
            "Backpacks",
            "Messenger Bags",
            "Travel Bags",
            "Wallets",
          ],
        },
        {
          title: "Accessories",
          items: ["Watches", "Belts", "Ties", "Sunglasses", "Hats", "Gloves"],
        },
        {
          title: "Collections",
          items: [
            "New Arrivals",
            "Trending Now",
            "Bestsellers",
            "Special Prices",
            "Coming Soon",
          ],
        },
      ],
    },
    {
      label: "ACCESSORIES",
      path: "/category/jewelery",
      submenu: [
        {
          title: "Jewelry",
          items: [
            "Necklaces",
            "Earrings",
            "Bracelets",
            "Rings",
            "Watches",
            "Brooches",
          ],
        },
        {
          title: "Fashion Accessories",
          items: [
            "Scarves",
            "Hats",
            "Gloves",
            "Belts",
            "Hair Accessories",
            "Sunglasses",
          ],
        },
        {
          title: "Bags",
          items: [
            "Clutches",
            "Wallets",
            "Card Holders",
            "Key Cases",
            "Travel Accessories",
          ],
        },
        {
          title: "Collections",
          items: [
            "New Arrivals",
            "Trending Now",
            "Bestsellers",
            "Special Prices",
            "Coming Soon",
          ],
        },
      ],
    },
    {
      label: "ALL PRODUCTS",
      path: "/products",
      submenu: [
        {
          title: "Featured",
          items: [
            "New Arrivals",
            "Bestsellers",
            "Special Offers",
            "Trending",
            "Collections",
          ],
        },
        {
          title: "Shop By Category",
          items: [
            "Women's Clothing",
            "Men's Clothing",
            "Accessories",
            "Footwear",
            "Bags",
          ],
        },
        {
          title: "Seasonal",
          items: [
            "Spring Collection",
            "Summer Essentials",
            "Fall Fashion",
            "Winter Staples",
            "Holiday Specials",
          ],
        },
        {
          title: "Price Range",
          items: [
            "Budget Friendly",
            "Mid-Range",
            "Premium",
            "Luxury",
            "Sale Items",
          ],
        },
      ],
    },
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const menuAnimation = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: { 
        height: { duration: 0.3 },
        opacity: { duration: 0.3 }
      }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: { 
        height: { duration: 0.3 },
        opacity: { duration: 0.15 }
      }
    }
  };

  return (
    <header 
      className={`fixed w-full top-0 z-20 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg" 
          : "bg-white shadow-md"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-900 hover:text-gray-600 focus:outline-none transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaXmark size={24} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                >
                  <FaBars size={24} />
                </motion.div>
              )}
            </motion.button>
          </div>

          {/* Desktop Navigation - Left */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveCategory(item.label)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link
                  to={item.path}
                  className="flex items-center text-gray-900 hover:text-black text-sm font-medium pb-4 group-hover:text-black transition-colors duration-200 relative"
                >
                  {item.label}
                  <FaChevronDown 
                    size={12} 
                    className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity duration-200 transform group-hover:translate-y-0.5 group-hover:rotate-180" 
                  />
                  <span className="absolute bottom-2 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
                
                <AnimatePresence>
                  {activeCategory === item.label && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={fadeIn}
                      className="fixed left-0 right-0 w-full"
                      style={{
                        background: "rgba(255, 255, 255, 0.98)",
                        backdropFilter: "blur(12px)",
                        top: "64px",
                      }}
                      onMouseEnter={() => setActiveCategory(item.label)}
                      onMouseLeave={() => setActiveCategory(null)}
                    >
                      <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                          {item.submenu.map((section) => (
                            <div key={section.title} className="overflow-hidden">
                              <motion.h3 
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="text-gray-900 font-medium mb-4 pb-2 border-b border-gray-100"
                              >
                                {section.title}
                              </motion.h3>
                              <ul className="space-y-2">
                                {section.items.map((subItem, index) => (
                                  <motion.li 
                                    key={subItem}
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ 
                                      duration: 0.2, 
                                      delay: 0.2 + (index * 0.03) 
                                    }}
                                  >
                                    <Link
                                      to={`${item.path}/${subItem.toLowerCase().replace(/ /g, "-")}`}
                                      className="text-gray-600 hover:text-black text-sm block py-1 transition-all duration-200 hover:translate-x-1 relative overflow-hidden group/item"
                                      onClick={() => setActiveCategory(null)}
                                    >
                                      <span className="relative z-10">{subItem}</span>
                                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black/10 transition-all duration-300 group-hover/item:w-full"></span>
                                    </Link>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Centered Logo */}
          <div className="flex-1 flex justify-center lg:justify-center lg:flex-none">
            <Link to="/home" className="text-2xl font-bold text-gray-900 flex items-center">
              {/* Logo with hover animation */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img
                  src={Logo}
                  alt="DEDSV"
                  className="h-40 w-40 hidden sm:block transition-all duration-300"
                />
                <span className="block sm:hidden tracking-wide">DEDSV</span>
              </motion.div>
            </Link>
          </div>

          {/* Right Side - Account and Cart and Admin */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={user ? "/account" : "/login"}
                className="text-gray-900 hover:text-black flex items-center relative overflow-hidden group transition-all duration-200"
                aria-label="Account"
              >
                <div className="relative z-10 flex items-center">
                  <FaUser size={18} className="group-hover:text-black transition-colors duration-200" />
                  <span className="ml-1 text-sm hidden md:inline group-hover:font-medium transition-all duration-200">
                    {user ? 'Account' : 'Login'}
                  </span>
                </div>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black/10 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>

            {/* Cart */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/cart"
                className="text-gray-900 hover:text-black relative flex items-center group transition-all duration-200"
                aria-label="Shopping Cart"
              >
                <div className="relative z-10 flex items-center">
                  <FaCartShopping size={18} className="group-hover:text-black transition-colors duration-200" />
                  {cart.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-transform duration-200 group-hover:bg-gray-800"
                    >
                      {cart.length}
                    </motion.span>
                  )}
                  <span className="ml-1 text-sm hidden md:inline group-hover:font-medium transition-all duration-200">
                    Cart
                  </span>
                </div>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black/10 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>

            {/* Login/Logout Button - Hidden on small screens, shown in mobile menu */}
            <div className="hidden md:block">
              {user ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm text-gray-900 hover:bg-gray-100 hover:shadow-sm rounded transition-all duration-200 hover:text-black"
                >
                  Logout
                </motion.button>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="px-3 py-1 text-sm text-gray-900 bg-gray-50 hover:bg-gray-100 hover:shadow-sm rounded transition-all duration-200 hover:text-black"
                  >
                    LOGIN
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Admin Link - Hidden on small screens for cleaner layout */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block"
            >
              <Link
                to="/admin"
                className="px-3 py-1 text-sm text-gray-900 bg-gray-50 hover:bg-gray-100 hover:shadow-sm rounded transition-all duration-200 hover:text-black"
              >
                ADMIN
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu with Animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuAnimation}
              className="lg:hidden border-t border-gray-200 fixed top-16 left-0 right-0 bg-white overflow-hidden z-30"
              style={{ maxHeight: 'calc(100vh - 64px)' }}
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-2 pt-2 pb-24 space-y-1 overflow-y-auto"
                style={{ maxHeight: 'calc(100vh - 64px)' }}
              >
                {menuItems.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="py-2"
                  >
                    <Link
                      to={item.path}
                      className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex justify-between items-center">
                        <span>{item.label}</span>
                        <FaChevronDown size={12} className="text-gray-500" />
                      </div>
                    </Link>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 + idx * 0.05 }}
                      className="pl-4 grid grid-cols-1 sm:grid-cols-2 gap-2"
                    >
                      {item.submenu.map((section, sectionIdx) => (
                        <motion.div 
                          key={section.title} 
                          className="mb-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 + sectionIdx * 0.03 }}
                        >
                          <h3 className="text-sm font-medium text-gray-900 py-2 border-b border-gray-100">
                            {section.title}
                          </h3>
                          <div className="space-y-1 pt-1">
                            {section.items.map((subItem, itemIdx) => (
                              <motion.div
                                key={subItem}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.2 + itemIdx * 0.03 }}
                              >
                                <Link
                                  to={`${item.path}/${subItem.toLowerCase().replace(/ /g, "-")}`}
                                  className="block py-1 pl-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-200"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
                
                {/* Mobile menu footer links */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="pt-4 mt-4 border-t border-gray-200"
                >
                  {!user ? (
                    <>
                      <Link
                        to="/login"
                        className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      Logout
                    </button>
                  )}
                  
                  <Link
                    to="/admin"
                    className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Panel
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Navbar;