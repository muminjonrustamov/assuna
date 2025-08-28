import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "../../utils/supabase";

import USFlag from "../../flags/us.png";
import RUFlag from "../../flags/ru.png";
import UZFlag from "../../flags/uz.png";

import "./editProduct.scss";

const BUCKET_NAME = "products";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name_en: "",
    name_ru: "",
    name_uz: "",
    description_en: "",
    description_ru: "",
    description_uz: "",
    category: "",
    images: []
  });
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получаем продукт
        const { data: product, error: productError } = await supabase
          .from("Products")
          .select("*")
          .eq("id", id)
          .single();
        if (productError) throw productError;

        // Получаем категории
        const { data: categoriesData, error: catError } = await supabase
          .from("Category")
          .select("*");
        if (catError) throw catError;

        // Парсим images из JSON
        let images = [];
        if (product.images) {
          try {
            const parsed = JSON.parse(product.images);
            images = parsed.map((img) =>
              img.startsWith("http")
                ? img
                : supabase.storage.from(BUCKET_NAME).getPublicUrl(img).data.publicUrl
            );
          } catch {
            images = [];
          }
        }

        setFormData({
          name_en: product.name_en || "",
          name_ru: product.name_ru || "",
          name_uz: product.name_uz || "",
          description_en: product.description_en || "",
          description_ru: product.description_ru || "",
          description_uz: product.description_uz || "",
          category: product.category || "",
          images
        });

        setCategories(categoriesData || []);
      } catch (err) {
        console.error("❌ Ошибка загрузки данных:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setFormData((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleRemoveImage = (idx) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx)
    }));
  };

  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      setLoadingSave(true);
      const uploadedUrls = [];
      for (let file of files) {
        const fileName = `${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from(BUCKET_NAME).upload(fileName, file);
        if (error) throw error;
        const publicUrl = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName).data.publicUrl;
        uploadedUrls.push(publicUrl);
      }
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    } catch (err) {
      console.error("Ошибка при загрузке файлов:", err.message);
      alert("Ошибка при загрузке изображений");
    } finally {
      setLoadingSave(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingSave(true);
      const imagesFiles = formData.images.map((url) => url.split("/").pop());
      const dataToSend = {
        name_en: formData.name_en,
        name_ru: formData.name_ru,
        name_uz: formData.name_uz,
        description_en: formData.description_en,
        description_ru: formData.description_ru,
        description_uz: formData.description_uz,
        category: formData.category,
        images: JSON.stringify(imagesFiles)
      };
      const { error } = await supabase.from("Products").update(dataToSend).eq("id", id);
      if (error) throw error;
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Ошибка при сохранении:", err.message);
      alert("Ошибка при обновлении продукта");
    } finally {
      setLoadingSave(false);
    }
  };

  if (isLoading) return <p className="loading-text">Загрузка данных...</p>;

  return (
    <div className="add-product-center">
      <div className="add-product-big">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
        <div className="add-product">
          <h2>✏️ Edit Product</h2>
          <form onSubmit={handleSubmit}>
            {/* EN */}
            <div className="form-language-section">
              <h3><img src={USFlag} alt="EN" className="flag-icon" /> English</h3>
              <input value={formData.name_en} onChange={(e) => handleChange(e, "name_en")} placeholder="Name (EN)" />
              <textarea value={formData.description_en} onChange={(e) => handleChange(e, "description_en")} placeholder="Description (EN)" />
            </div>

            {/* RU */}
            <div className="form-language-section">
              <h3><img src={RUFlag} alt="RU" className="flag-icon" /> Русский</h3>
              <input value={formData.name_ru} onChange={(e) => handleChange(e, "name_ru")} placeholder="Название (RU)" />
              <textarea value={formData.description_ru} onChange={(e) => handleChange(e, "description_ru")} placeholder="Описание (RU)" />
            </div>

            {/* UZ */}
            <div className="form-language-section">
              <h3><img src={UZFlag} alt="UZ" className="flag-icon" /> O‘zbek</h3>
              <input value={formData.name_uz} onChange={(e) => handleChange(e, "name_uz")} placeholder="Nomi (UZ)" />
              <textarea value={formData.description_uz} onChange={(e) => handleChange(e, "description_uz")} placeholder="Tavsif (UZ)" />
            </div>

            {/* Category */}
            <div className="form-group">
              <label>Category:</label>
              <select value={formData.category} onChange={handleCategoryChange} required>
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {lang === "uz" ? cat.name_uz : lang === "ru" ? cat.name_ru : cat.name_en}
                  </option>
                ))}
              </select>
            </div>

            {/* Images */}
            <div className="form-group">
              <label>Images:</label>
              <div className="custom-file-upload">
                <label htmlFor="fileUpload" className="upload-button">
                  {formData.images.length ? "Add more images" : "Upload Images"}
                </label>
                <input id="fileUpload" type="file" accept="image/*" multiple onChange={handleImagesChange} />
              </div>

              {formData.images.length > 0 && (
                <div className="preview-wrapper">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="image-box">
                      <img src={img} alt={`Preview ${idx}`} className="image-preview" />
                      <button type="button" className="remove-image" onClick={() => handleRemoveImage(idx)}>❌</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" disabled={loadingSave}>{loadingSave ? "Saving..." : "💾 Save Changes"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;