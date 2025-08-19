import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './productDetail.scss';
import api from '../../API/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    if (!category) return '';
    return category[`name_${lang}`] || category.name_en || '';
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setProduct(null);
      setError(null);

      try {
        const [productRes, categoriesRes] = await Promise.all([
          api.get(`/products/${id}?t=${Date.now()}`),
          api.get('/categories')
        ]);

        let actualProduct = Array.isArray(productRes.data)
          ? productRes.data[0]
          : productRes.data?.data || productRes.data;

        if (!actualProduct || !actualProduct._id) {
          throw new Error('Product not found');
        }

        setProduct(actualProduct);
        setCategories(categoriesRes.data || []);
        setSelectedImage(actualProduct.image || (actualProduct.images?.[0] ?? null));
      } catch (err) {
        console.error('❌ Failed to fetch product:', err);
        setError(t('productNotFound') || 'Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, lang, t]);

  if (loading) {
    return <div className="product-detail"><p>Loading...</p></div>;
  }

  if (error || !product) {
    return (
      <div className="product-detail">
        <button className="back-btn" onClick={() => navigate('/product')}>
          ← {t('back') || 'Back'}
        </button>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  const images = product.images && product.images.length > 0
    ? [product.image, ...product.images].filter(Boolean)
    : product.image ? [product.image] : [];

  return (
    <div className="product-detail">
      <button className="back-btn" onClick={() => navigate('/product')}>
        ← {t('back') || 'Back'}
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
                    className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="detail-content">
          <h2 id="product-name">
            {product[`name_${lang}`] || product.name_en}
          </h2>
          <p className="category">
            {getCategoryName(product.categoryId || product.category)}
          </p>
          <p className="description">
            {product[`description_${lang}`] || product.description_en}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;