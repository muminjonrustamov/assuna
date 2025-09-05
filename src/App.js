import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/home/home";
import About from "./pages/about/about";
import Product from "./pages/product/product";
import Contact from "./pages/contact/contact";
import Dashboard from "./pages/dashboard/dashboard";
import AddProduct from "./pages/dashboard/add-product";
import AddCategory from "./pages/add-category/addCategory";
import ProductDetails from "./pages/productDetail/productDetail";
import EditProduct from "./pages/editProduct/editProduct";
import Login from "./pages/login/login";
import CategoriesPage from "./pages/dashboard/category/category";
import EditCategory from "./pages/editCategory/editCategory";

import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import Layout from "./Layout/Layout";

function App() {
  useEffect(() => {
    if (!document.getElementById("tawkScript")) {
      // глобальные переменные Tawk.to
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      // создаём script
      const s1 = document.createElement("script");
      s1.id = "tawkScript";
      s1.async = true;
      s1.src = "https://embed.tawk.to/68babe41c9aac81922500f72/1j4cnech4"; // твой property id
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");

      s1.onload = () => {
        console.log("✅ Tawk.to loaded successfully");
      };

      s1.onerror = () => {
        console.error("❌ Failed to load Tawk.to");
      };

      // вставляем в DOM
      const s0 = document.getElementsByTagName("script")[0];
      if (s0 && s0.parentNode) {
        s0.parentNode.insertBefore(s1, s0);
      } else {
        document.body.appendChild(s1);
      }
    }
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/add-category"
          element={
            <ProtectedRoute>
              <AddCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/edit/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/category"
          element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/edit-category/:id"
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