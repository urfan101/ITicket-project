import { Refetch } from "@/business/common/types/refetch";
import { HttpError } from "@/infrastructure/api/HttpError";
import { useQuery } from "@tanstack/react-query";
import { getBasket } from "@/infrastructure/repositories/basket";  // Убедитесь, что путь правильный
import { BasketResponseDTO } from "@/infrastructure/dto/basket";  

type UseGetBasket = {
  data: BasketResponseDTO | undefined;
  error: HttpError | null;
  isLoading: boolean;
  isError: boolean;
  refetch: Refetch<BasketResponseDTO>;
};

const useGetBasket = (): UseGetBasket => {
  const { data, error, isLoading, isError, refetch } = useQuery<BasketResponseDTO, HttpError>({
    queryKey: ['basket'],
    queryFn: getBasket,
  });

  return {
    data,
    error,
    isLoading,
    isError,
    refetch,
  };
};

export default useGetBasket;
