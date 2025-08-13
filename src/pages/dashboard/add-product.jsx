import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './add-product.scss';

import { useTranslation } from 'react-i18next';
import USFlag from '../../flags/us.png';
import RUFlag from '../../flags/ru.png';
import UZFlag from '../../flags/uz.png';

const AddProduct = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name_en: '',
    name_ru: '',
    name_uz: '',
    description_en: '',
    description_ru: '',
    description_uz: '',
    category: '', 
    image: '', 
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories');
        setCategories(res.data || []);
      } catch (err) {
        console.error('Ошибка при загрузке категорий:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleCatChange = (e) => {
    const categoryId = e.target.value;
    setFormData(prevData => ({
      ...prevData,
      category: categoryId
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const productData = {
      ...formData
    };

    const res = await axios.post('http://localhost:5000/api/products', productData);
    console.log('✅ Продукт добавлен:', res.data);

    navigate('/dashboard');
  } catch (error) {
    console.error('❌ Ошибка при добавлении продукта:', error);
    if (error.response) {
      console.error('🧾 Ответ от сервера:', error.response.data);
      console.error('🔢 Статус:', error.response.status);
      console.error('📋 Заголовки:', error.response.headers);
    } else if (error.request) {
      console.error('📡 Запрос был отправлен, но ответа нет:', error.request);
    } else {
      console.error('💥 Ошибка при настройке запроса:', error.message);
    }

    alert('Ошибка при сохранении продукта.');
  }
};

  return (
    <div className="add-product-center">
      <div className="add-product-big">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="add-product">
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit}>
            {/* English */}
            <div className="form-language-section">
              <h3><img src={USFlag} alt="English" className="flag-icon" /> English</h3>
              <input
                type="text"
                name="name_en"
                placeholder="Name (EN)"
                value={formData.name_en}
                onChange={handleChange}
                required
              />
              <textarea
                name="description_en"
                placeholder="Description (EN)"
                value={formData.description_en}
                onChange={handleChange}
                required
              />
            </div>

            {/* Russian */}
            <div className="form-language-section">
              <h3><img src={RUFlag} alt="Russian" className="flag-icon" /> Русский</h3>
              <input
                type="text"
                name="name_ru"
                placeholder="Название (RU)"
                value={formData.name_ru}
                onChange={handleChange}
              />
              <textarea
                name="description_ru"
                placeholder="Описание (RU)"
                value={formData.description_ru}
                onChange={handleChange}
              />
            </div>

            {/* Uzbek */}
            <div className="form-language-section">
              <h3><img src={UZFlag} alt="Uzbek" className="flag-icon" /> O‘zbek</h3>
              <input
                type="text"
                name="name_uz"
                placeholder="Nomi (UZ)"
                value={formData.name_uz}
                onChange={handleChange}
              />
              <textarea
                name="description_uz"
                placeholder="Tavsif (UZ)"
                value={formData.description_uz}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label>Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleCatChange}
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {lang === 'uz' ? cat.name_uz : lang === 'ru' ? cat.name_ru : cat.name_en}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label>Image:</label>
              <div className="custom-file-upload">
                <label htmlFor="fileUpload" className="upload-button">
                  {formData.image ? 'Change Image' : 'Upload Image'}
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              {formData.image && (
                <div className="preview-wrapper">
                  <img src={formData.image} alt="preview" className="image-preview" />
                </div>
              )}
            </div>

            <button type="submit">Save Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;