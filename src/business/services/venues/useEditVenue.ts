import { HttpError } from "@/infrastructure/api/HttpError";
import { UpdateVenueDTO } from "@/infrastructure/dto/venues";
import { updateVenue } from "@/infrastructure/repositories/venues";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToasts } from "@/business/utils/showToasts";

const useEditVenue = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, error, isError, isPending } = useMutation<
    void,
    HttpError,
    { venueId: string; data: UpdateVenueDTO }
  >({
    mutationFn: async ({ venueId, data }) => {
      console.log("Sending request to update venue", { venueId, data });
      const response = await updateVenue(venueId, data);
      console.log("Server response:", response);
      return response;
    },
    onSuccess: async () => {
      showToasts("Məkan uğurla yeniləndi", "success");
      await queryClient.invalidateQueries({ queryKey: ["venues"] });
    },
    onError: (error: HttpError) => {
      showToasts(error.message, "error");
    },
  });

  return {
    updateVenue: mutateAsync,
    error,
    isError,
    isPending,
  };
};

export default useEditVenue;
