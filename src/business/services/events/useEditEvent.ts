import { HttpError } from "@/infrastructure/api/HttpError";
import { UpdateEventDTO } from "@/infrastructure/dto/events";
import { updateEvent } from "@/infrastructure/repositories/events";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToasts } from "@/business/utils/showToasts";

const useEditEvent = () => {
  const queryClient = useQueryClient();
  
  const { mutateAsync, error, isError, isPending } = useMutation<
    void,
    HttpError,
    { eventId: string; data: UpdateEventDTO }
  >({
    mutationFn: async ({ eventId, data }) => {
      console.log("Calling updateEvent with:", { eventId, data });
      const response = await updateEvent(eventId, data);
      return response;
    },
    onSuccess: async () => {
      showToasts("Tədbir uğurla yeniləndi", "success");
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error: HttpError) => {
      showToasts(error.message, "error");
    },
  });

  return {
    updateEvent: mutateAsync,
    error,
    isError,
    isPending,
  };
};

export default useEditEvent;
