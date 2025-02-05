import { HttpError } from "@/infrastructure/api/HttpError";
import { RegisterDTO } from "@/infrastructure/dto/auth";
import { register } from "@/infrastructure/repositories/auth";
import { UseMutateAsyncFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from "@/business/validations/RegistrationSchema";
import { showToasts } from "@/business/utils/showToasts";

type UseRegister = {
  error: HttpError | null;
  isError: boolean;
  isPending: boolean;
  register: UseMutateAsyncFunction<void, HttpError, RegisterDTO, unknown>;
  form: UseFormReturn<RegisterDTO>;
};

const useRegister = (): UseRegister => {
  const queryClient = useQueryClient();
  const form = useForm<RegisterDTO>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(RegisterSchema),
  });

  const { error, isError, isPending, mutateAsync } = useMutation<void, HttpError, RegisterDTO>({
    mutationFn: register,
    onSuccess: async () => {
      showToasts("Вы успешно зарегистрировались, пожалуйста проверьте свою почту", "success")
      await queryClient.invalidateQueries({ queryKey: ['users-me'] });
    },
    onError: (error: HttpError) => {
      showToasts(error.message, "error")
    }
  });

  return {
    error,
    isError,
    isPending,
    register: mutateAsync,
    form,
  };
};

export default useRegister;