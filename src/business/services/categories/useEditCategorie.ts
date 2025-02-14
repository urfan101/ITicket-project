import { HttpError } from "@/infrastructure/api/HttpError";
import { UpdateCategoryDTO } from "@/infrastructure/dto/categories";
import { updateCategory } from "@/infrastructure/repositories/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToasts } from "@/business/utils/showToasts";

const useEditCategory = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, error, isError, isPending } = useMutation<
    void,
    HttpError,
    { categoryId: string; data: UpdateCategoryDTO }
  >({
    mutationFn: ({ categoryId, data }) => updateCategory(categoryId, data),
    onSuccess: async () => {
      showToasts("Kategoriya uğurla yeniləndi", "success");
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: HttpError) => {
      showToasts(error.message, "error");
    },
  });

  return {
    updateCategory: mutateAsync,
    error,
    isError,
    isPending,
  };
};

export default useEditCategory;
