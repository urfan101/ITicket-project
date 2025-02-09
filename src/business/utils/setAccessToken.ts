import Cookies from 'js-cookie';

export const setAccessToken = (accessToken: string) => {
  Cookies.set('accessToken', accessToken, {
    expires: Number(import.meta.env.VITE_ACCESS_TOKEN_EXP), // Приводим значение к числу (например, 2)
    path: '/', // Доступен на всех страницах сайта
  });
};



