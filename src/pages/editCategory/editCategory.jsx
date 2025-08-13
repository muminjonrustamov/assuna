import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import api from '../../API/api';

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();

  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await api.get('/categories');
        console.log('Старые данные категорий:', res.data);

        const foundCategory = res.data.find(cat => cat._id === id);

        if (!foundCategory) {
          setError('Категория не найдена.');
        } else {
          setCategory(foundCategory);
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Ошибка при получении данных категории:', err);
        setError('Не удалось загрузить данные категории.');
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/categories/${id}`, category);
      alert('Категория успешно обновлена!');
      navigate('/dashboard/category');
    } catch (err) {
      console.error('❌ Ошибка при обновлении категории:', err);
      alert('Ошибка при обновлении категории. Попробуйте еще раз.');
    }
  };

  if (isLoading) {
    return <p>Загрузка данных категории...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!category) {
    return <p>Категория не найдена.</p>;
  }

  return (
    <div className="add-category">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> {t('back')}
      </button>

      <h2>{t('Edit Category')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="row-wrapper">
          {['en', 'ru', 'uz'].map((lang) => (
            <div className="lang-box" key={lang}>
              <label>Name ({lang.toUpperCase()})</label>
              <input
                type="text"
                name={`name_${lang}`}
                value={category[`name_${lang}`] || ''}
                onChange={handleChange}
                required
              />
              <label>Description ({lang.toUpperCase()})</label>
              <textarea
                name={`description_${lang}`}
                value={category[`description_${lang}`] || ''}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <button type="submit">💾 {t('Update')}</button>
      </form>
    </div>
  );
};

export default EditCategory
