import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./productDetail.scss";
import { supabase } from "../../utils/supabase";
import { ClipLoader } from "react-spinners";

const BUCKET_NAME = "products";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return "-";
    return lang === "uz"
      ? category.name_uz
      : lang === "ru"
      ? category.name_ru
      : category.name_en;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: productData, error: productError } = await supabase
          .from("Products")
          .select("*")
          .eq("id", id)
          .single();
        if (productError || !productData) throw productError || new Error("Product not found");

        const { data: categoriesData, error: catError } = await supabase
          .from("Category")
          .select("*");
        if (catError) throw catError;

        let images = [];
        if (productData.images) {
          try {
            const parsed = JSON.parse(productData.images);
            images = parsed.map((img) =>
              img.startsWith("http")
                ? img
                : supabase.storage.from(BUCKET_NAME).getPublicUrl(img).data.publicUrl
            );
          } catch {
            images = [];
          }
        }

        setProduct({ ...productData, images });
        setSelectedImage(images[0] || null);
        setCategories(categoriesData || []);
      } catch (err) {
        console.error("❌ Failed to fetch product:", err);
        setError(t("productNotFound") || "Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, lang, t]);

  if (loading)
    return (
      <div className="loader-container">
        <ClipLoader size={80} color="#f97316" />
      </div>
    );

  if (error || !product) {
    return (
      <div className="product-detail">
        <button className="back-btn" onClick={() => navigate("/product")}>
          ← {t("back") || "Back"}
        </button>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : [];

  return (
    <div className="product-detail">
      <button className="back-btn" onClick={() => navigate("/product")}>
        ← {t("back") || "Back"}
      </button>

      <div className="detail-card">
        {images.length > 0 && (
          <div className="images-section">
            <img
              src={selectedImage}
              alt={product[`name_${lang}`] || product.name_en}
              className="main-image"
            />
            {images.length > 1 && (
              <div className="thumbnail-row">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    className={`thumbnail ${selectedImage === img ? "active" : ""}`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="detail-content">
          <h2>{product[`name_${lang}`] || product.name_en}</h2>
          <p className="category">{getCategoryName(product.category)}</p>
          <p className="description">{product[`description_${lang}`] || product.description_en}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;