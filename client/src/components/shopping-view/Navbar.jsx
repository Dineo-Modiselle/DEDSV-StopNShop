
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaBars, FaXmark, FaUser, FaCartShopping } from "react-icons/fa6";
import Logo from "../../assets/company-logo2.png";
import { useAuthStore } from "../../store/authStore.js";
import toast from "react-hot-toast";

function Navbar() {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const dropdownRef = useRef(null);
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out");
  };

  const menuItems = [
    {
      label: "Women",
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
            "Activewear",
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
      label: "Men",
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
      label: "Jewelry",
      path: "/category/jewelery",
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
      label: "All Products",
      path: "/products",
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
  ];

  return (
    <header className="bg-white shadow-md border-b border-gray-200 fixed w-full top-0 z-20">
      <nav className="max-w-[1920px] mx-auto px-4">
        <div className="flex items-center h-16 relative">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-900 hover:text-gray-600"
          >
            {isOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Navigation - Far Left */}
          <div className="hidden lg:flex md:items-center space-x-8 absolute left-12">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveCategory(item.label)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link
                  to={item.path}
                  className="text-gray-900 hover:text-gray-600 text-sm font-medium pb-4" // Added padding bottom
                >
                  {item.label}
                </Link>
                {activeCategory === item.label && (
                  <div
                    className="fixed left-0 right-0 w-screen"
                    style={{
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                      top: "64px",
                      paddingTop: "10px", // Added padding top to create hoverable gap
                    }}
                    onMouseEnter={() => setActiveCategory(item.label)}
                    onMouseLeave={() => setActiveCategory(null)}
                  >
                    <div className="max-w-[1920px] mx-auto px-4 py-6">
                      <div className="grid grid-cols-5 gap-8">
                        {item.submenu.map((section) => (
                          <div key={section.title}>
                            <h3 className="text-gray-900 font-medium mb-4">
                              {section.title}
                            </h3>
                            <ul className="space-y-3">
                              {section.items.map((subItem) => (
                                <li key={subItem}>
                                  <Link
                                    to={`${item.path}/${subItem
                                      .toLowerCase()
                                      .replace(/ /g, "-")}`}
                                    className="text-gray-600 hover:text-gray-900 text-sm block"
                                    onClick={() => setActiveCategory(null)}
                                  >
                                    {subItem}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Centered Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/home" className="text-3xl font-bold text-gray-900">
              {/* Show image on large screens */}
              <img
                src={Logo}
                alt="company logo"
                className="w-auto h-50 hidden lg:block"
              />
              {/* Show text on small and medium screens */}
              <span className="block lg:hidden text-2xl">DEDSV</span>
            </Link>
          </div>

          {/* Right Side - Account and Cart */}
          <div className="flex items-center space-x-6 absolute right-12 :hidden">
            <Link
              to={user ? "/account" : "/login"}
              className="text-gray-900 hover:text-gray-600 "
            >
              <FaUser size={20} />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="text-gray-900 hover:text-gray-600 relative"
            >
              <FaCartShopping size={20} className="xs:" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ">
                {cart.length}
              </span>
            </Link>

            {user ? (
              <Link
                to="/"
                className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 "
                onClick={handleLogout}
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 "
              >
                Login
              </Link>
            )}
          </div>
          <Link
                to="/admin"
                className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 "
              >
                Admin
              </Link>
        </div>
        

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 fixed top-16 left-0 right-0 bg-white h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="pb-24">
              {menuItems.map((item) => (
                <div key={item.label} className="py-2">
                  <Link
                    to={item.path}
                    className="block px-4 py-2 text-gray-900 hover:text-gray-600 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                  <div className="grid grid-cols-2 gap-2 px-4">
                    {item.submenu.map((section) => (
                      <div key={section.title} className="mb-4">
                        <h3 className="text-sm font-medium text-gray-900 py-2">
                          {section.title}
                        </h3>
                        <div className="space-y-2">
                          {section.items.map((subItem) => (
                            <Link
                              key={subItem}
                              to={`${item.path}/${subItem
                                .toLowerCase()
                                .replace(/ /g, "-")}`}
                              className="block py-1 text-sm text-gray-600 hover:text-gray-900"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                  >
                    Register
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
