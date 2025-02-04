import Cookies from 'js-cookie';

export const setAccessToken = (accessToken: string) => {
  Cookies.set('accessToken', accessToken, {
    expires: import.meta.env.VITE_ACCESS_TOKEN_EXP, // 2 дня указано в .env (48 часов)
    path: '/', // Доступен на всех страницах сайта
  });
};
