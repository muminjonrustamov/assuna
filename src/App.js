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