import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../utils/supabase';
import './dashboard.scss';

const Dashboard = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const isAuthenticated = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const { data: productsData, error: productsError } = await supabase
          .from('Products')
          .select('*');
        if (productsError) throw productsError;
        setProducts(productsData || []);

        const { data: categoriesData, error: categoriesError } = await supabase
          .from('Category')
          .select('*');
        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate]);

  const deleteProduct = async (id) => {
    if (!window.confirm('Удалить этот продукт?')) return;

    try {
      const { error } = await supabase
        .from('Products')
        .delete()
        .eq('id', id);
      if (error) throw error;

      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Ошибка при удалении продукта:', err.message);
      alert('Не удалось удалить продукт');
    }
  };

  const getCategoryName = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    if (!cat) return '-';
    return currentLang === 'uz'
      ? cat.name_uz
      : currentLang === 'ru'
      ? cat.name_ru
      : cat.name_en;
  };

  return (
    <div className="dashboard-wrapper">
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

      <main className="dashboard">
        <div className="dashboard-header">
          <h1>📦 Products</h1>
          <button
            className="add-btn"
            onClick={() => navigate('/dashboard/add-product')}
          >
            ➕ Add Product
          </button>
        </div>

        <div className="table-card">
          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p>Нет продуктов</p>
          ) : (
            <table>
              <thead>
  <tr>
    <th className="name-col">Name</th>
    <th className="category-col">Category</th>
    <th className="desc-col">Description</th>
    <th className="actions-col">Actions</th>
  </tr>
</thead>
<tbody>
  {products.map((prod) => (
    <tr key={prod.id}>
      <td className="name-col">{prod[`name_${currentLang}`] || '-'}</td>
      <td className="category-col">
        <span className="category-badge">{getCategoryName(prod.category)}</span>
      </td>
      <td className="desc-col">{prod[`description_${currentLang}`] || '-'}</td>
      <td className="actions-col">
        <div className="actions">
          <button
            className="edit-btn"
            onClick={() => navigate(`/dashboard/edit/${prod.id}`)}
          >
            ✏️
          </button>
          <button
            className="delete-btn"
            onClick={() => deleteProduct(prod.id)}
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