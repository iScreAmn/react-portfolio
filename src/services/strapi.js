import axios from 'axios';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
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
    const response = await strapiClient.get('/home-sections');
    // Возвращаем первую запись (в Strapi v5 данные без вложенного attributes)
    return response.data.data[0];
  } catch (error) {
    console.error('Error fetching home section from Strapi:', error);
    // Возвращаем null, чтобы использовать fallback данные
    return null;
  }
};
