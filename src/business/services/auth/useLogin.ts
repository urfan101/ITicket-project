// useLogin.ts
import { HttpError } from "@/infrastructure/api/HttpError";
import { LoginDTO, LoginResponseDTO } from "@/infrastructure/dto/auth/index";
import { login } from "@/infrastructure/repositories/auth";
import { UseMutateAsyncFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/business/validations/LoginSchema";
import { showToasts } from "@/business/utils/showToasts";
import { setAccessToken } from "@business/utils/setAccessToken";

type UseLogin = {
  error: HttpError | null;
  isError: boolean;
  isPending: boolean;
  login: UseMutateAsyncFunction<LoginResponseDTO, HttpError, LoginDTO, unknown>;
  form: UseFormReturn<LoginDTO>;
};

const useLogin = (): UseLogin => {
  const queryClient = useQueryClient();
  const form = useForm<LoginDTO>({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const { error, isError, isPending, mutateAsync } = useMutation<LoginResponseDTO, HttpError, LoginDTO>({
    mutationFn: login,
    onSuccess: async (data: LoginResponseDTO) => {
      console.log(data.accessToken)
      if (data.accessToken) {
        setAccessToken(data.accessToken);
        
      }
      showToasts("Вы успешно вошли в систему", "success");
      await queryClient.invalidateQueries({ queryKey: ["users-me"] });
    },
    onError: (error: HttpError) => {
      showToasts(error.message, "error");
    },
  });

  return {
    error,
    isError,
    isPending,
    login: mutateAsync,
    form,
  };
};

export default useLogin;
