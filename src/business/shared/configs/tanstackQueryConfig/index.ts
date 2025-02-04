import { DefaultOptions, QueryClient } from '@tanstack/react-query';

const queryConfig: DefaultOptions = {
  queries: {
    staleTime: import.meta.env.STALE_TIME * 60 * 1000, // Данные считаются свежими 5 минут
    retry: import.meta.env.GET_RETRY_COUNT, // Количество повторных попыток запроса при ошибке
    refetchOnWindowFocus: false, // Не обновлять данные при фокусе окна
    refetchOnReconnect: true, // Перезапрашивать данные при восстановлении соединения
    refetchOnMount: false, // Не делать повторный запрос при монтировании компонента
  },
  mutations: {
    retry: 1, // Повторять мутации только 1 раз при ошибке Emil gay
  },
};

export const tanstackQueryClient = new QueryClient({ defaultOptions: queryConfig });
