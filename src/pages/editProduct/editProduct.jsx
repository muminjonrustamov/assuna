import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../API/api";

import USFlag from "../../flags/us.png";
import RUFlag from "../../flags/ru.png";
import UZFlag from "../../flags/uz.png";

import "./editProduct.scss";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: { en: "", ru: "", uz: "" },
    description: { en: "", ru: "", uz: "" },
    images: [],
    category: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProduct, resCategories] = await Promise.all([
          api.get(`/products/${id}`),
          api.get("/categories")
        ]);

        const product = resProduct.data;

        setFormData({
          name: {
            en: product.name_en || "",
            ru: product.name_ru || "",
            uz: product.name_uz || ""
          },
          description: {
            en: product.description_en || "",
            ru: product.description_ru || "",
            uz: product.description_uz || ""
          },
          images: product.images || [],
          category: product.category || ""
        });

        setCategories(resCategories.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error("❌ Ошибка загрузки данных:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e, langKey, field) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [langKey]: value
      }
    }));
  };

  const handleCategoryChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      category: e.target.value
    }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then((images) => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...images]
        }));
      })
      .catch((err) => console.error("Ошибка при загрузке изображений:", err));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        name_en: formData.name.en,
        name_ru: formData.name.ru,
        name_uz: formData.name.uz,
        description_en: formData.description.en,
        description_ru: formData.description.ru,
        description_uz: formData.description.uz,
        images: formData.images,
        category: formData.category
      };

      await api.put(`/products/${id}`, dataToSend);
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Ошибка при сохранении:", error);
      alert("Произошла ошибка при обновлении продукта.");
    }
  };

  if (isLoading) return <p className="loading-text">Загрузка данных продукта...</p>;

  return (
    <div className="edit-product-center">
      <div className="edit-product-big">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <div className="edit-product">
          <h2>✏️ Edit Product</h2>
          <form onSubmit={handleSubmit}>

            <div className="form-language-section">
              <h3><img src={USFlag} alt="EN" className="flag-icon" /> English</h3>
              <input
                type="text"
                placeholder="Name (EN)"
                value={formData.name.en}
                onChange={(e) => handleChange(e, "en", "name")}
              />
              <textarea
                placeholder="Description (EN)"
                value={formData.description.en}
                onChange={(e) => handleChange(e, "en", "description")}
              />
            </div>

            <div className="form-language-section">
              <h3><img src={RUFlag} alt="RU" className="flag-icon" /> Русский</h3>
              <input
                type="text"
                placeholder="Название (RU)"
                value={formData.name.ru}
                onChange={(e) => handleChange(e, "ru", "name")}
              />
              <textarea
                placeholder="Описание (RU)"
                value={formData.description.ru}
                onChange={(e) => handleChange(e, "ru", "description")}
              />
            </div>

            <div className="form-language-section">
              <h3><img src={UZFlag} alt="UZ" className="flag-icon" /> O‘zbek</h3>
              <input
                type="text"
                placeholder="Nomi (UZ)"
                value={formData.name.uz}
                onChange={(e) => handleChange(e, "uz", "name")}
              />
              <textarea
                placeholder="Tavsif (UZ)"
                value={formData.description.uz}
                onChange={(e) => handleChange(e, "uz", "description")}
              />
            </div>

            <div className="form-group">
              <label>Category:</label>
              <select value={formData.category} onChange={handleCategoryChange} required>
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {lang === "uz" ? cat.name_uz : lang === "ru" ? cat.name_ru : cat.name_en}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Images:</label>
              <div className="custom-file-upload">
                <label htmlFor="fileUpload" className="upload-button">
                  Upload Images
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                />
              </div>
              <div className="preview-wrapper">
                {formData.images.map((img, index) => (
                  <div key={index} className="image-box">
                    <img src={img} alt={`Preview ${index}`} className="image-preview" />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => handleRemoveImage(index)}
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit">💾 Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
