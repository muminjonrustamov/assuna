// App.jsx
import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/home/home';
import About from './pages/about/about';
import Product from './pages/product/product';
import Contact from './pages/contact/contact';
import Dashboard from './pages/dashboard/dashboard';
import AddProduct from './pages/dashboard/add-product';
import AddCategory from './pages/add-category/addCategory';
import ProductDetails from './pages/productDetail/productDetail';
import EditProduct from './pages/editProduct/editProduct';
import Login from './pages/login/login';
import CategoriesPage from './pages/dashboard/category/category';
import EditCategory from './pages/editCategory/editCategory';

import ProtectedRoute from './components/protectedRoute/protectedRoute';
import Layout from './Layout/Layout';

function App() {
  useEffect(() => {
    if (window.__tawk_added) return;
    window.__tawk_added = true;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = 'https://embed.tawk.to/689dc5e0664fee19271dfe55/1j2k4ptds';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    document.body.appendChild(s1);

    const interval = setInterval(() => {
      if (window.Tawk_API && (window.Tawk_API.showWidget || window.Tawk_API.toggle || window.Tawk_API.maximize)) {
        try {
          if (window.Tawk_API.showWidget) window.Tawk_API.showWidget();
          if (window.Tawk_API.maximize) {
            setTimeout(() => {
              try { window.Tawk_API.maximize(); } catch (e) {}
            }, 300);
          } else if (window.Tawk_API.toggle) {
            setTimeout(() => {
              try { window.Tawk_API.toggle(); } catch (e) {}
            }, 300);
          }
        } catch (e) {
        }
        clearInterval(interval);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/add-product'
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/add-category'
          element={
            <ProtectedRoute>
              <AddCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/edit/:id'
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/category'
          element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/dashboard/edit-category/:id'
          element={
            <ProtectedRoute>
              <EditCategory />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;