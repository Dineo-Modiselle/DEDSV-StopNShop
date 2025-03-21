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
import Addresses from "./pages/shopping-view/Addresses";
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

const ProtectRoutes = ({ roles }) => {
  const {isAuthenticated, user} = useAuthStore();
  
  //const user = 
  //   {
  //    _id: "67d948dcf09ca90df0416a99",
  //    name: "Vladyslav",
  //    email: "plugin.vg.co@gmail.com",
  //    orders: [],
  //    role: "admin",
  //   }

  //if(!isAuthenticated || !user.isVerified) return <Navigate to="/login" replace />
  //if(isAuthenticated && user.isVerified && !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />
  //if( ["admin"].includes(user.role)) return <Outlet />

  // If the user is not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // If the user's role is not included in the allowed roles, redirect to unauthorized
  if (!roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If all checks pass, render the protected route
  return <Outlet />;
};

function App() {
  const { ischeckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);

  // Show a loading indicator while checking authentication
  if (ischeckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Routes>
          {/* Redirect admin users to the dashboard */}
          {isAuthenticated && user?.role === "admin" && (
            <Route path="*" element={<Navigate to="/admin" replace />} />
          )}

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectRoutes roles={["admin"]}/>} >
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
          

          {/* Shopping Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/orders" element={<Orders />} />
          <Route path="/account/addresses" element={<Addresses />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/category/:category" element={<TestComp />} />
          <Route path="/category/:category" element={<ProductOverview />} />
          <Route
            path="/category/:category/:subcategory"
            element={<ProductOverview />}
          />
          <Route path="/products" element={<ProductOverview />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<PaymentFailure />} />
          <Route path="/privacy" element={<PrivacyTerms />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/paynow" element={<PayNow />} />

          {/* 404 Route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster />
      </main>
      <Chatbot />
      <Footer />
      main
    </div>
  );
}

export default App;
