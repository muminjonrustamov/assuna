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
    image: "",
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
          image: product.image || "",
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
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
        image: formData.image,
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
            {/* English */}
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

            {/* Russian */}
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

            {/* Uzbek */}
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

            {/* Category */}
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

            {/* Image */}
            <div className="form-group">
              <label>Image:</label>
              <div className="custom-file-upload">
                <label htmlFor="fileUpload" className="upload-button">
                  {formData.image ? "Change Image" : "Upload Image"}
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
                  <img src={formData.image} alt="Preview" className="image-preview" />
                </div>
              )}
            </div>
            <button type="submit">💾 Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;