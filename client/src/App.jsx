import React, { useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Footer from "./components/shopping-view/Footer";
import Navbar from "./components/shopping-view/Navbar";
import ProductOverview from "./pages/shopping-view/ProductOverview";
import ProductDetail from "./pages/shopping-view/ProductDetail";
import Dashboard from "./pages/admin-view/Dashboard";
import AdminProducts from "./pages/admin-view/Products";
import AdminOrders from "./pages/admin-view/Orders";
import AdminUsers from "./pages/admin-view/Users";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import Home from "./pages/shopping-view/Home";
import Account from "./pages/shopping-view/Account";
import Checkout from "./pages/shopping-view/Checkout";
import PageNotFound from "./pages/not-found/PageNotFound";
import Cart from "./pages/shopping-view/Cart";
import AboutUs from "./components/shopping-view/AboutUs";
import Orders from "./pages/shopping-view/Orders";
import EmailVerificationPage from "./pages/auth/EmailVerficationPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore.js";
import TestComp from "./pages/shopping-view/TestComp";
import Success from "./pages/shopping-view/PaymentSuccess";
import PaymentSuccess from "./pages/shopping-view/PaymentSuccess";
import PaymentFailure from "./pages/shopping-view/PaymentFailure";
import PrivacyTerms from "./pages/shopping-view/PrivacyPolicies";
import Chatbot from "./pages/shopping-view/Chatbot";
import ContactUs from "./pages/shopping-view/ContactUs";
import PayNow from "./pages/shopping-view/PayNow";
import ForgotPassword from "./pages/auth/ForgotPassword";
import LandingPage from "./components/shopping-view/LandingPage.jsx";
import {useLocation} from "react-router-dom";
import Contact from "./components/shopping-view/Contact.jsx";


const ProtectRoutes = () => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <div className="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);

  // Show a loading indicator while checking authentication
  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }
console.log("hey")
  return (
   
    <div className="flex flex-col min-h-screen">
      {!isLandingPage && <Navbar />}  {/* Hide Navbar on Landing Page */}
    
      <main className="flex-grow pt-16">
<Routes>
  {/* Admin Routes */}
  <Route path="/admin" element={<ProtectRoutes />}>
    <Route index element={<Dashboard />} />
    <Route path="products" element={<AdminProducts />} />
    <Route path="orders" element={<AdminOrders />} />
    <Route path="users" element={<AdminUsers />} />
  </Route>

  {/* Auth Routes */}
  <Route path="/login" element={<AuthLogin />} />
  <Route path="/register" element={<AuthRegister />} />
  <Route path="/verify-email" element={<EmailVerificationPage />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />

  {/* Public Routes */}
  <Route path="/" element={<LandingPage />} />
  <Route path="/home" element={<Home />} />
  <Route path="/category/:category" element={<TestComp />} />
  <Route path="/products" element={<ProductOverview />} />
  <Route path="/product/:id" element={<ProductDetail />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/about" element={<AboutUs />} />
  <Route path="/success" element={<PaymentSuccess />} />
  <Route path="/cancel" element={<PaymentFailure />} />
  <Route path="/privacy" element={<PrivacyTerms />} />
  <Route path="/contact" element={<ContactUs />} />
  <Route path="/chatbot" element={<Chatbot />} />
  <Route path="/ourstores" element={<Contact />} />

  {/* Protected Routes - must be logged in */}
  <Route element={<ProtectRoutes />}>
    <Route path="/account" element={<Account />} />
    <Route path="/account/orders" element={<Orders />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/paynow" element={<PayNow />} />
  </Route>

  {/* 404 Route */}
  <Route path="*" element={<PageNotFound />} />
</Routes>

<Toaster />
      </main>
      {!isLandingPage && <Chatbot />} {/* Hide Chatbot on Landing Page */}
      {!isLandingPage && <Footer />} {/* Hide Footer on Landing Page */}
     
      
    </div>
    
  );
}

export default App;
