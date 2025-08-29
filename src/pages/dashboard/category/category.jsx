import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../../utils/supabase';
import './category.scss';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase.from('Category').select('*');
        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error('Ошибка при получении категорий:', error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (categoryId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту категорию?')) {
      try {
        const { error } = await supabase
          .from('Category')
          .delete()
          .eq('id', categoryId);

        if (error) throw error;

        setCategories(categories.filter((cat) => cat.id !== categoryId));
      } catch (error) {
        console.error('Ошибка при удалении категории:', error.message);
        alert('Не удалось удалить категорию.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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
            <table>
              <thead>
                <tr>
                  <th>Name ({currentLang.toUpperCase()})</th>
                  <th>Description ({currentLang.toUpperCase()})</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>
                      <div className="category-name-with-id">
                        <strong>{cat[`name_${currentLang}`]}</strong>
                        <p className="category-id">ID: {cat.id}</p>
                      </div>
                    </td>
                    <td>{cat[`description_${currentLang}`]}</td>
                    <td className="actions">
                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(`/dashboard/edit-category/${cat.id}`)
                        }
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(cat.id)}
                      >
                        🗑️
                      </button>
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

export default Category;