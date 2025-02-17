import { HttpError } from "@/infrastructure/api/HttpError";
import { AddVenueDTO } from "@/infrastructure/dto/venues";
import { addVenue } from "@/infrastructure/repositories/venues";
import { UseMutateAsyncFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { showToasts } from "@/business/utils/showToasts";

type UseAddVenue = {
  error: HttpError | null;
  isError: boolean;
  isPending: boolean;
  addVenue: UseMutateAsyncFunction<void, HttpError, AddVenueDTO, unknown>;
};

const useAddVenue = (): UseAddVenue => {
  const queryClient = useQueryClient();

  const { error, isError, isPending, mutateAsync } = useMutation<void, HttpError, AddVenueDTO>({
    mutationFn: addVenue,
    onSuccess: () => {
      showToasts("Мəkan uğurla əlavə olundu", "success");
      queryClient.invalidateQueries({ queryKey: ['venues'] });
    },
    onError: (error: HttpError) => {
      showToasts(error.message, "error");
    },
  });

  return {
    error,
    isError: isError || isPending,
    isPending,
    addVenue: mutateAsync,
  };
};

export default useAddVenue;
