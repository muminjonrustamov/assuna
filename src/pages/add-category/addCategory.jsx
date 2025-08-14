import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './addCategory.scss';
import axios from 'axios';

const AddCategory = () => {
  const navigate = useNavigate(); 

  const [category, setCategory] = useState({
    name_en: '',
    name_ru: '',
    name_uz: '',
    description_en: '',
    description_ru: '',
    description_uz: '',
  });

  const [categories, setCategories] = useState([]); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://backend-assuna-1.onrender.com/api/categories');
        setCategories(res.data);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    };

    fetchCategories();
  }, []);

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
      const res = await axios.post('https://backend-assuna-1.onrender.com/api/categories', category);
      console.log('✅ Категория добавлена:', res.data);

      navigate('/product');
    } catch (error) {
      console.error('❌ Ошибка при добавлении категории:', error);
      if (error.response) {
        console.error('🧾 Ответ от сервера:', error.response.data);
        console.error('🔢 Статус:', error.response.status);
        console.error('📋 Заголовки:', error.response.headers);
      } else if (error.request) {
        console.error('📡 Запрос был отправлен, но ответа нет:', error.request);
      } else {
        console.error('💥 Ошибка при настройке запроса:', error.message);
      }

      alert('Ошибка при сохранении категории.');
    }
  };

  return (
    <div className="add-category">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> back
      </button>

      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="row-wrapper">
          {['en', 'ru', 'uz'].map((lang) => (
            <div className="lang-box" key={lang}>
              <label>Name ({lang.toUpperCase()})</label>
              <input
                type="text"
                name={`name_${lang}`}
                value={category[`name_${lang}`]}
                onChange={handleChange}
                required
              />
              <label>Description ({lang.toUpperCase()})</label>
              <textarea
                name={`description_${lang}`}
                value={category[`description_${lang}`]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddCategory;
