import { HttpError } from "@/infrastructure/api/HttpError";
import { UpdateMeDTO } from "@/infrastructure/dto/user";
import { updateMe } from "@/infrastructure/repositories/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToasts } from "@/business/utils/showToasts";

const useUpdateMe = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, error, isError, isPending } = useMutation<
    void,
    HttpError,
    UpdateMeDTO
  >({
    mutationFn: updateMe,
    onSuccess: async () => {
      showToasts("Profiliniz uğurla yeniləndi", "success");
      await queryClient.invalidateQueries({ queryKey: ["users-me"] });
    },
    onError: (error: HttpError) => {
      showToasts(error.message, "error");
    },
  });

  return {
    updateMe: mutateAsync,
    error,
    isError,
    isPending,
  };
};

export default useUpdateMe;
