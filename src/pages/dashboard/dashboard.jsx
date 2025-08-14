import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../API/api';
import './dashboard.scss';

const Dashboard = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const isAuthenticated = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories'),
        ]);
        setProducts(productRes.data);
        setCategories(categoryRes.data);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate]);

  const getCategoryName = (cat) => {
    if (!cat) return '-';

    if (typeof cat === 'object' && cat[`name_${currentLang}`]) {
      return cat[`name_${currentLang}`];
    }

    const found = categories.find(c => c._id === cat);
    return found ? found[`name_${currentLang}`] : '-';
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Удалить этот продукт?')) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Ошибка при удалении продукта:', err);
      alert('Не удалось удалить продукт');
    }
  };

  return (
    <div className="category-page">
      <aside className="sidebar">
        <div className="top">
          <h2>Dashboard</h2>
          <nav>
            <ul>
              <li onClick={() => navigate('/dashboard')}>📦 Products</li>
              <li onClick={() => navigate('/dashboard/category')}>🗂️ Category</li>
            </ul>
          </nav>
        </div>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
        >
          🔓 Logout
        </button>
      </aside>

      <main className="category-content">
        <div className="category-header">
          <h1>📦 Products</h1>
          <button
            className="add-category-btn"
            onClick={() => navigate('/dashboard/add-product')}
          >
            ➕ Add Product
          </button>
        </div>

        <div className="category-table">
          {products.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod, i) => (
                  <tr key={prod._id}>
                    <td>{i + 1}</td>
                    <td>{prod[`name_${currentLang}`] || '-'}</td>
                    <td>
                      <p className="product-category">
                        {getCategoryName(prod.categoryId || prod.category)}
                      </p>
                    </td>
                    <td>{prod[`description_${currentLang}`] || '-'}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="edit-btn"
                          onClick={() => navigate(`/dashboard/edit/${prod._id}`)}
                        >
                          ✏️
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteProduct(prod._id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;