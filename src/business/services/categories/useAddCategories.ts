import { HttpError } from "@/infrastructure/api/HttpError";
import { AddCategoriesDTO } from "@/infrastructure/dto/categories";
import { addCategory } from "@/infrastructure/repositories/categories";
import { UseMutateAsyncFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { showToasts } from "@/business/utils/showToasts";

type UseAddCategory = {
  error: HttpError | null;
  isError: boolean;
  isPending: boolean;
  addCategory: UseMutateAsyncFunction<void, HttpError, AddCategoriesDTO, unknown>;
};

const useAddCategory = (): UseAddCategory => {
  const queryClient = useQueryClient();

  const { error, isError, isPending, mutateAsync } = useMutation<void, HttpError, AddCategoriesDTO>({
    mutationFn: addCategory,
    onSuccess: () => {
      showToasts("Категория успешно добавлена", "success");
      queryClient.invalidateQueries({ queryKey: ['categories'] }); 
    },
    onError: (error: HttpError) => {
      showToasts(error.message, "error");
    },
  });

  return {
    error,
    isError: isError || isPending,
    isPending,  
    addCategory: mutateAsync,
  };
};

export default useAddCategory;

