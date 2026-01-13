import axios from 'axios';

// Нормализуем URL - убираем trailing slash если есть
const getStrapiUrl = () => {
  const url = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

const STRAPI_URL = getStrapiUrl();
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

const strapiClient = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
  },
});

// Получает данные секции Home из Strapi CMS
export const fetchHomeSection = async () => {
  try {
    const url = `${STRAPI_URL}/api/home-sections`;
    console.log('🌐 Fetching from:', url);
    const response = await strapiClient.get('/home-sections');
    console.log('🌐 Response status:', response.status);
    console.log('🌐 Response data:', response.data);
    // Возвращаем первую запись (в Strapi v5 данные без вложенного attributes)
    return response.data.data[0];
  } catch (error) {
    console.error('❌ Error fetching home section:', error);
    console.error('❌ Error response:', error.response?.data);
    console.error('❌ Error status:', error.response?.status);
    // Возвращаем null, чтобы использовать fallback данные
    return null;
  }
};
