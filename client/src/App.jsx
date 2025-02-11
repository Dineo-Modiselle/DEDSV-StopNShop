
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/shopping-view/Footer';
import Navbar from './components/shopping-view/Navbar';
import ProductOverview from './pages/shopping-view/ProductOverview';
import ProductDetail from './pages/shopping-view/ProductDetail';
import Dashboard from './pages/admin-view/dashboard';
import AdminProducts from './pages/admin-view/products';
import AdminOrders from './pages/admin-view/orders';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import Home from './pages/shopping-view/home';
import Account from './pages/shopping-view/account';
import Checkout from './pages/shopping-view/checkout';
import PageNotFound from './pages/not-found/PageNotFound';


function App() {
  return (
    <div>

      <Navbar />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />

        {/* Auth Routes */}
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />

        {/* Shopping Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products" element={<ProductOverview />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* 404 Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;