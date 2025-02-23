import { HttpError } from "@/infrastructure/api/HttpError";
import { AddToBasketDTO } from "@/infrastructure/dto/basket";
import { addToBasket } from "@/infrastructure/repositories/basket";  
import { UseMutateAsyncFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { showToasts } from "@/business/utils/showToasts";

type UseAddBasket = {
  error: HttpError | null;
  isError: boolean;
  isPending: boolean;
  addToBasket: UseMutateAsyncFunction<void, HttpError, AddToBasketDTO, unknown>;
};

const useAddBasket = (): UseAddBasket => {
  const queryClient = useQueryClient();

  const { error, isError, isPending, mutateAsync } = useMutation<void, HttpError, AddToBasketDTO>({
    mutationFn: addToBasket,
    onSuccess: () => {
      showToasts("Билет успешно добавлен в корзину", "success");
      queryClient.invalidateQueries({ queryKey: ['basket'] });
    },
    onError: (error: HttpError) => {
      showToasts(error.message, "error");
    },
  });

  return {
    error,
    isError: isError || isPending,
    isPending,
    addToBasket: mutateAsync,
  };
};

export default useAddBasket;
