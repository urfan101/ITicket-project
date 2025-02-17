import { Refetch } from "@/business/common/types/refetch";
import { HttpError } from "@/infrastructure/api/HttpError";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/infrastructure/repositories/categories/index";
import { CategoriesDTO } from "@/infrastructure/dto/categories/index";  

type UseGetCategories = {
  data: CategoriesDTO[] | undefined;
  error: HttpError | null;
  isLoading: boolean;
  isError: boolean;
  refetch: Refetch<CategoriesDTO[]>;
};

const useGetCategories = (): UseGetCategories => {
  const { data, error, isLoading, isError, refetch } = useQuery<CategoriesDTO[], HttpError>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return {
    data,
    error,
    isLoading,
    isError,
    refetch,
  };
};


export default useGetCategories;
