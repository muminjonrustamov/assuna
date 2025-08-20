import React from 'react';
import './contact.scss';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';

const ContactPage = () => {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();

    let timeInput = e.target.querySelector('input[name="time"]');
    if (!timeInput) {
      timeInput = document.createElement('input');
      timeInput.type = 'hidden';
      timeInput.name = 'time';
      e.target.appendChild(timeInput);
    }
    timeInput.value = new Date().toLocaleString();

    emailjs.sendForm(
      'service_5l8pbr1',
      'template_9l3tcfg',
      e.target,
      'iZY2uec3c5OqkSBdO'
    )
    .then(() => {
      toast.success(t('contact.form.successMessage') || 'Сообщение отправлено!', {
        position: 'top-right',
        autoClose: 3000,
      });
      e.target.reset();
    })
    .catch(() => {
      toast.error(t('contact.form.errorMessage') || 'Ошибка при отправке письма', {
        position: 'top-right',
        autoClose: 3000,
      });
    });
  };

  return (
    <div className="contact-page">
      <h2>{t('contact.title')}</h2>
      <p className="subtext">{t('contact.subtitle')}</p>

      <div className="contact-container">
        <div className="contact-form">
          <h3>{t('contact.form.title')}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row" style={{ gap: '6px' }}>
              <div className="form-group">
                <label>{t('contact.form.firstName')}</label>
                <input type="text" name="firstname" placeholder={t('contact.form.firstName')} required />
              </div>
              <div className="form-group">
                <label>{t('contact.form.lastName')}</label>
                <input type="text" name="lastname" placeholder={t('contact.form.lastName')} required />
              </div>
            </div>

            <div className="form-group">
              <label>{t('contact.form.email')}</label>
              <input type="email" name="email" placeholder={t('contact.form.email')} required />
            </div>

            <div className="form-group">
              <label>{t('contact.form.messagePlaceholder')}</label>
              <textarea name="message" placeholder={t('contact.form.messagePlaceholder')} required></textarea>
            </div>

            <button type="submit">{t('contact.form.sendButton')}</button>
          </form>
        </div>

        <div className="contact-info">
          <div className="info-box">
            <h4>📍 {t('contact.address.title')}</h4>
            <p>{t('contact.address.value')}</p>
          </div>

          <div className="info-box">
            <h4>📞 {t('contact.phone.title')}</h4>
            {t('contact.phone.values', { returnObjects: true }).map((phone, index) => (
              <p key={index}>{phone}</p>
            ))}
          </div>

          <div className="info-box">
            <h4>📧 {t('contact.email.title')}</h4>
            <p>{t('contact.email.value')}</p>
          </div>

          <div className="info-box">
            <h4>{t('contact.hours.title')}</h4>
            {Array.isArray(t('contact.hours.value', { returnObjects: true })) ? (
              t('contact.hours.value', { returnObjects: true }).map((line, i) => (
                <p key={i}>{line}</p>
              ))
            ) : (
              <p>{t('contact.hours.value')}</p>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ContactPage;