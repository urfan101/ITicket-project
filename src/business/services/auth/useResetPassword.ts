import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetPassword } from "@/infrastructure/repositories/auth";
import { ResetPasswordDTO } from "@/infrastructure/dto/auth";
import { showToasts } from "@/business/utils/showToasts";
import { useNavigate } from "react-router-dom";

const useResetPassword = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation<void, Error, ResetPasswordDTO>({
    
    mutationFn: resetPassword,
    onSuccess: async () => {
      showToasts("Parol uğurla dəyişdirildi", "success");
      navigate("/login"); 
      await queryClient.invalidateQueries({ queryKey: ['users-me'] });
    },
    onError: (error: Error) => {
      showToasts(error.message, "error");
    }
  });

  return mutation;
};

export default useResetPassword;
