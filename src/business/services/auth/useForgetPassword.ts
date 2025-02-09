import { showToasts } from "@/business/utils/showToasts";
import { HttpError } from "@/infrastructure/api/HttpError";
import { ForgetPasswordDTO } from "@/infrastructure/dto/auth";
import { forgotPassword } from "@/infrastructure/repositories/auth";
import { useMutation } from "@tanstack/react-query";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgetPasswordSchema } from "@/business/validations/ForgetPasswordSchema";
import { useNavigate } from "react-router-dom";

type UseForgetPassword = {
  form: UseFormReturn<ForgetPasswordDTO>;
  forgetPassword: (data: ForgetPasswordDTO) => Promise<void>;
  isPending: boolean;
};

const useForgetPassword = (): UseForgetPassword => {
  const navigate = useNavigate();

  const form = useForm<ForgetPasswordDTO>({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: { email: "" },
    resolver: zodResolver(ForgetPasswordSchema),
  });

  const { mutateAsync, isPending } = useMutation<void, HttpError, ForgetPasswordDTO>({
    mutationFn: forgotPassword,
    onSuccess: () => {
      navigate("/login");
      showToasts("Проверьте свою почту, ссылка для восстановления пароля отправлена", "success");
    },
    onError: (error: HttpError) => {
      showToasts(error.message, "error");
    },
  });

  return {
    form,
    forgetPassword: mutateAsync, 
    isPending,
  };
};

export default useForgetPassword;
