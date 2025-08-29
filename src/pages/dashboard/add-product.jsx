// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./add-product.scss";
// import { useTranslation } from "react-i18next";
// import USFlag from "../../flags/us.png";
// import RUFlag from "../../flags/ru.png";
// import UZFlag from "../../flags/uz.png";
// import { getCategories, createProduct, uploadImage } from "../../utils/supabase";

// const AddProduct = () => {
//   const { i18n } = useTranslation();
//   const lang = i18n.language || "en";
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name_en: "",
//     name_ru: "",
//     name_uz: "",
//     description_en: "",
//     description_ru: "",
//     description_uz: "",
//     category: "",
//     images: [],
//   });

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await getCategories();
//         setCategories(data || []);
//       } catch (err) {
//         console.error("", err.message);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCatChange = (e) => {
//     setFormData((prev) => ({ ...prev, category: e.target.value }));
//   };

//   // ====== Загрузка файлов ======
//   const handleImageChange = async (e) => {
//     const files = Array.from(e.target.files || []);
//     if (!files.length) return;

//     try {
//       setLoading(true);
//       const uploadedUrls = [];
//       for (let file of files) {
//         const url = await uploadImage(file);
//         uploadedUrls.push(url);
//       }
//       setFormData((prev) => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
//     } catch (err) {
//       console.error("Ошибка при загрузке файлов:", err.message);
//       alert("Ошибка при загрузке изображений");
//     } finally {
//       setLoading(false);
//       e.target.value = "";
//     }
//   };

//   const handleRemoveImage = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.category) return alert("Выберите категорию!");

//     try {
//       setLoading(true);
//       const createdProduct = await createProduct(formData);
//       console.log("✅ Продукт добавлен:", createdProduct);
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("❌ Ошибка при добавлении продукта:", err.message);
//       alert("Ошибка при сохранении продукта.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="add-product-center">
//       <div className="add-product-big">
//         <button className="back-button" onClick={() => navigate(-1)}>
//           ← Back
//         </button>
//         <div className="add-product">
//           <h2>Add Product</h2>

//           {/* EN */}
//           <div className="form-language-section">
//             <h3>
//               <img src={USFlag} alt="English" className="flag-icon" /> English
//             </h3>
//             <input
//               type="text"
//               name="name_en"
//               placeholder="Name (EN)"
//               value={formData.name_en}
//               onChange={handleChange}
//               required
//             />
//             <textarea
//               name="description_en"
//               placeholder="Description (EN)"
//               value={formData.description_en}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* RU */}
//           <div className="form-language-section">
//             <h3>
//               <img src={RUFlag} alt="Russian" className="flag-icon" /> Русский
//             </h3>
//             <input
//               type="text"
//               name="name_ru"
//               placeholder="Название (RU)"
//               value={formData.name_ru}
//               onChange={handleChange}
//             />
//             <textarea
//               name="description_ru"
//               placeholder="Описание (RU)"
//               value={formData.description_ru}
//               onChange={handleChange}
//             />
//           </div>

//           {/* UZ */}
//           <div className="form-language-section">
//             <h3>
//               <img src={UZFlag} alt="Uzbek" className="flag-icon" /> O‘zbek
//             </h3>
//             <input
//               type="text"
//               name="name_uz"
//               placeholder="Nomi (UZ)"
//               value={formData.name_uz}
//               onChange={handleChange}
//             />
//             <textarea
//               name="description_uz"
//               placeholder="Tavsif (UZ)"
//               value={formData.description_uz}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Category */}
//           <div className="form-group">
//             <label>Category:</label>
//             <select value={formData.category} onChange={handleCatChange} required>
//               <option value="">-- Select Category --</option>
//               {categories.map((cat) => (
//                 <option key={cat.id} value={cat.id}>
//                   {lang === "uz"
//                     ? cat.name_uz
//                     : lang === "ru"
//                     ? cat.name_ru
//                     : cat.name_en}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Images */}
//           <div className="form-group">
//             <label>Images:</label>
//             <div className="custom-file-upload">
//               <label htmlFor="fileUpload" className="upload-button">
//                 {formData.images.length ? "Add more images" : "Upload Images"}
//               </label>
//               <input
//                 id="fileUpload"
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageChange}
//               />
//             </div>
//             {formData.images.length > 0 && (
//               <div className="preview-wrapper">
//                 {formData.images.map((img, idx) => (
//                   <div className="image-box" key={idx}>
//                     <img src={img} alt={`preview-${idx}`} className="image-preview" />
//                     <button
//                       type="button"
//                       className="remove-image"
//                       onClick={() => handleRemoveImage(idx)}
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <button type="submit" disabled={loading} onClick={handleSubmit}>
//             {loading ? "Saving..." : "Save Product"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./add-product.scss";
import { useTranslation } from "react-i18next";
import USFlag from "../../flags/us.png";
import RUFlag from "../../flags/ru.png";
import UZFlag from "../../flags/uz.png";
import { getCategories, createProduct, uploadImage } from "../../utils/supabase";

const AddProduct = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name_en: "",
    name_ru: "",
    name_uz: "",
    description_en: "",
    description_ru: "",
    description_uz: "",
    category: "",
    images: [],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (err) {
        // Ошибки можно обработать, например, показать alert
        alert("Ошибка при загрузке категорий");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCatChange = (e) => {
    setFormData((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      setLoading(true);
      const uploadedUrls = [];
      for (let file of files) {
        const url = await uploadImage(file);
        uploadedUrls.push(url);
      }
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    } catch (err) {
      alert("Ошибка при загрузке изображений");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) return alert("Выберите категорию!");

    try {
      setLoading(true);
      await createProduct(formData);
      navigate("/dashboard");
    } catch (err) {
      alert("Ошибка при сохранении продукта.");
    } finally {
      setLoading(false);
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

          {/* EN */}
          <div className="form-language-section">
            <h3>
              <img src={USFlag} alt="English" className="flag-icon" /> English
            </h3>
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

          {/* RU */}
          <div className="form-language-section">
            <h3>
              <img src={RUFlag} alt="Russian" className="flag-icon" /> Русский
            </h3>
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

          {/* UZ */}
          <div className="form-language-section">
            <h3>
              <img src={UZFlag} alt="Uzbek" className="flag-icon" /> O‘zbek
            </h3>
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
            <select value={formData.category} onChange={handleCatChange} required>
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {lang === "uz"
                    ? cat.name_uz
                    : lang === "ru"
                    ? cat.name_ru
                    : cat.name_en}
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
              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </div>
            {formData.images.length > 0 && (
              <div className="preview-wrapper">
                {formData.images.map((img, idx) => (
                  <div className="image-box" key={idx}>
                    <img src={img} alt={`preview-${idx}`} className="image-preview" />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => handleRemoveImage(idx)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" disabled={loading} onClick={handleSubmit}>
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;