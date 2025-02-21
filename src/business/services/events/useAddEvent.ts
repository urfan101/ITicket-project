import { HttpError } from "@/infrastructure/api/HttpError";
import { AddEventDTO } from "@/infrastructure/dto/events";
import { addEvent } from "@/infrastructure/repositories/events";
import { UseMutateAsyncFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { showToasts } from "@/business/utils/showToasts";

type UseAddEvent = {
  error: HttpError | null;
  isError: boolean;
  isPending: boolean;
  addEvent: UseMutateAsyncFunction<void, HttpError, AddEventDTO, unknown>;
};

const useAddEvent = (): UseAddEvent => {
  const queryClient = useQueryClient();

  const { error, isError, isPending, mutateAsync } = useMutation<void, HttpError, AddEventDTO>({
    mutationFn: addEvent,
    onSuccess: () => {
      showToasts("Tədbir uğurla əlavə olundu", "success");
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error: HttpError) => {
      showToasts(error.message, "error");
    },
  });

  return {
    error,
    isError: isError || isPending,
    isPending,
    addEvent: mutateAsync,
  };
};

export default useAddEvent;