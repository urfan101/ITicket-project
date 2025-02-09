import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/infrastructure/repositories/auth";
import { ResetPasswordDTO } from "@/infrastructure/dto/auth";
import { showToasts } from "@/business/utils/showToasts";
import { useNavigate } from "react-router-dom";

const useResetPassword = () => {
  const navigate = useNavigate();

  // Мутация для сброса пароля
  const mutation = useMutation<void, Error, ResetPasswordDTO>({
    mutationFn: resetPassword,
    onSuccess: () => {
      showToasts("Parol uğurla dəyişdirildi", "success");
      navigate("/login"); // Перенаправление после успешного сброса пароля
    },
    onError: (error: Error) => {
      showToasts(error.message, "error");
    }
  });

  return mutation;
};

export default useResetPassword;
