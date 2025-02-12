import { showToasts } from "@/business/utils/showToasts";
import { HttpError } from "@/infrastructure/api/HttpError";
import { SubmitRegisterDTO } from "@/infrastructure/dto/auth";
import { submitRegister } from "@/infrastructure/repositories/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


type UseSubmitAccount = {
  isPending: boolean,
};

type UseSubmitAccountProps = {
  email: string,
  token: string,
}


const useSubmitAccount = ({email, token}: UseSubmitAccountProps): UseSubmitAccount => {
  const queryClient = useQueryClient();

  const navigation = useNavigate()

  const { isPending, mutateAsync } = useMutation<void, HttpError, SubmitRegisterDTO>({
    mutationFn: submitRegister,
    onSuccess: async () => {
      navigation("/login")
      showToasts("Все прошло успешено, пожалуйста войдите в него", "success")
      await queryClient.invalidateQueries({ queryKey: ['users-me'] });
    },
    onError: (error: HttpError) => {
      navigation("/login")
      showToasts(error.message, "error")
    }
  })

  useEffect(() => {
    const encodedToken = encodeURIComponent(token || "");
    (async () => {
      await mutateAsync({email, token: encodedToken});
    })();
  }, [email, token, mutateAsync])

  return {
    isPending
  }
}


export default useSubmitAccount;
