import { HttpError } from "@/infrastructure/api/HttpError";
import { deleteMe } from "@/infrastructure/repositories/user"; 
import { UseMutateAsyncFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { showToasts } from "@/business/utils/showToasts";
import { deleteAccessToken } from "@/business/utils/deleteAccessToken"; 
import { useNavigate } from "react-router-dom";

type UseDeleteMe = {
  error: HttpError | null;
  isError: boolean;
  isPending: boolean;
  deleteMeMutation: UseMutateAsyncFunction<void, HttpError, void, unknown>;
};

const useDeleteMe = (): UseDeleteMe => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { error, isError, status, mutateAsync } = useMutation<void, HttpError>({
    mutationFn: deleteMe, 
    onSuccess: async () => {
      deleteAccessToken(); 
      showToasts("Пользователь успешно удален", "success");
      navigate("/");
      await queryClient.invalidateQueries({ queryKey: ['users-me'] });
    },
    onError: (error: HttpError) => {
      showToasts(error.message, "error");
    },
  });

  return {
    error,
    isError,
    isPending: status === "pending", 
    deleteMeMutation: mutateAsync,
  };
};

export default useDeleteMe;
