import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./product.scss";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { supabase } from "../../utils/supabase";

const BUCKET_NAME = "products";

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: prodData, error: prodError } = await supabase
          .from("Products")
          .select("*");
        if (prodError) throw prodError;

        const { data: catData, error: catError } = await supabase
          .from("Category")
          .select("*");
        if (catError) throw catError;

        const normalizedProducts = (prodData || []).map((prod) => {
          let images = [];
          if (prod.images) {
            try {
              const parsed = JSON.parse(prod.images);
              images = parsed.map((img) =>
                img.startsWith("http")
                  ? img
                  : supabase.storage.from(BUCKET_NAME).getPublicUrl(img).data
                      .publicUrl
              );
            } catch {
              images = [];
            }
          }
          return { ...prod, images };
        });

        setProducts(normalizedProducts);
        setCategories(catData || []);
      } catch (err) {
        console.error("❌ Failed to fetch:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return "-";
    return lang === "uz"
      ? category.name_uz
      : lang === "ru"
      ? category.name_ru
      : category.name_en;
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => String(p.category) === selectedCategory)
    : products;

  return (
    <div className="product-page-big">
      <div className="product-page">
        <h2>{t("product.title")}</h2>

        {/* Всегда описание */}
        <p className="productp">{t("product.description")}</p>

        {loading && (
          <div className="loading-center" aria-live="polite" aria-busy="true">
            <ClipLoader size={60} speedMultiplier={0.9} />
            <span className="loading-text">{t("common.loading")}</span>
          </div>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && (
          <div className="products-with-sidebar">
            <div className="product-list">
              {filteredProducts.length === 0 ? (
                <p>{t("product.noProducts")}</p>
              ) : (
                filteredProducts.map((prod) => {
                  const firstImage =
                    prod.images.length > 0 ? prod.images[0] : null;
                  return (
                    <div key={prod.id} className="product-card">
                      {firstImage ? (
                        <img
                          src={firstImage}
                          alt={
                            lang === "uz"
                              ? prod.name_uz
                              : lang === "ru"
                              ? prod.name_ru
                              : prod.name_en
                          }
                        />
                      ) : (
                        <div className="no-image-placeholder">No Image</div>
                      )}
                      <div className="card-content">
                        <h3>
                          {lang === "uz"
                            ? prod.name_uz
                            : lang === "ru"
                            ? prod.name_ru
                            : prod.name_en}
                        </h3>
                        <p className="product-category">
                          {getCategoryName(prod.category)}
                        </p>
                        <div className="buttons">
                          <button
                            className="details-btn"
                            onClick={() => navigate(`/product/${prod.id}`)}
                          >
                            {t("product.detailsBtn")}{" "}
                            <FaArrowRight className="arrow-icon" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;