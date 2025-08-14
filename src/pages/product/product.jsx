import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './product.scss';
import defaultImage from '../../images/medicine.webp';
import api from '../../API/api';
import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories'),
        ]);
        setProducts(prodRes.data || []);
        setCategories(catRes.data || []);
      } catch (err) {
        console.error('Failed to fetch:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    if (!category) return '';
    return lang === 'uz' ? category.name_uz : lang === 'ru' ? category.name_ru : category.name_en;
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter(
          (p) => p.categoryId === selectedCategory || p.category === selectedCategory
        );

  return (
    <div className="product-page-big">
      <div className="product-page">
        <h2>{t('product.title')}</h2>
        <p className="productp">{t('product.description')}</p>

        {loading && (
          <div className="loading-center" aria-live="polite" aria-busy="true">
            <ClipLoader size={60} speedMultiplier={0.9} />
            <span className="loading-text">{t('common.loading')}</span>
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && (
          <div className="products-with-sidebar">
            <aside className="categories-sidebar">
              <div className="categories-box">
                <h4>{t('product.categories') || 'Kategoriyalar'}</h4>

                <button
                  type="button"
                  className={selectedCategory === 'all' ? 'active' : ''}
                  onClick={() => setSelectedCategory('all')}
                >
                  {t('product.allProducts') || 'Barcha mahsulotlar'}
                </button>

                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat._id}
                    className={selectedCategory === cat._id ? 'active' : ''}
                    onClick={() => setSelectedCategory(cat._id)}
                    title={
                      lang === 'uz'
                        ? cat.name_uz
                        : lang === 'ru'
                        ? cat.name_ru
                        : cat.name_en
                    }
                  >
                    {lang === 'uz'
                      ? cat.name_uz
                      : lang === 'ru'
                      ? cat.name_ru
                      : cat.name_en}
                  </button>
                ))}
              </div>
            </aside>

            <div className="product-list">
              {filteredProducts.length === 0 ? (
                <p>{t('product.noProducts')}</p>
              ) : (
                filteredProducts.map((prod, index) => (
                  <div key={prod._id || index} className="product-card">
                    <img
                      src={prod.image || defaultImage}
                      alt={prod.name?.en || 'Product'}
                    />
                    <div className="card-content">
                      <h3>
                        {lang === 'uz'
                          ? prod.name_uz
                          : lang === 'ru'
                          ? prod.name_ru
                          : prod.name_en}
                      </h3>

                      <p className="product-category">
                        {getCategoryName(prod.categoryId || prod.category)}
                      </p>

                      <div className="buttons">
                        <button
                          className="details-btn"
                          onClick={() => navigate(`/product/${prod._id}`)}
                        >
                          {t('product.detailsBtn')} <FaArrowRight className="arrow-icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;