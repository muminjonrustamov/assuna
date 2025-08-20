import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../../API/api';
import './category.scss';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleEdit = (categoryId) => {
    navigate(`/dashboard/edit-category/${categoryId}`);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту категорию?')) {
      try {
        await api.delete(`/categories/${categoryId}`);
        setCategories(categories.filter(cat => cat._id !== categoryId));
      } catch (error) {
        console.error('Ошибка при удалении категории:', error);
        alert('Не удалось удалить категорию.');
      }
    }
  };

  return (
    <div className="category-page">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <ul>
            <li onClick={() => navigate('/dashboard')}>📦 Products</li>
            <li onClick={() => navigate('/dashboard/category')}>🗂️ Category</li>
          </ul>
        </nav>

        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>
            🔓 Logout
          </button>
        </div>
      </aside>

      <main className="category-content">
        <div className="category-header">
          <h1>📂 Categories</h1>
          <button
            className="add-category-btn"
            onClick={() => navigate('/dashboard/add-category')}
          >
            ➕ Add Category
          </button>
        </div>

        <div className="category-table">
          {categories.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name ({currentLang.toUpperCase()})</th>
                    <th>Description ({currentLang.toUpperCase()})</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat, i) => (
                    <tr key={cat._id}>
                      <td>{i + 1}</td>
                      <td>
                        <div className="category-name-with-id">
                          {cat[`name_${currentLang}`]}
                          <p className="category-id">ID: {cat._id}</p>
                        </div>
                      </td>
                      <td>{cat[`description_${currentLang}`]}</td>
                      <td className="actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(cat._id)}
                        >
                          ✏️
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(cat._id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Category;