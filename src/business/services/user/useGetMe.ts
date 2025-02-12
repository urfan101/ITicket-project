import { Refetch } from "@/business/common/types/refetch";
import { HttpError } from "@/infrastructure/api/HttpError";
import { GetMeDTO } from "@/infrastructure/dto/user";
import { getMe } from "@/infrastructure/repositories/user";
import { useQuery } from "@tanstack/react-query";


type UseGetMe = {
  data: GetMeDTO | undefined;
  error: HttpError | null;
  isLoading: boolean;
  isError: boolean;
  refetch: Refetch<GetMeDTO>;
};

const useGetMe = (): UseGetMe => {
  const { data, error, isLoading, isError, refetch } = useQuery<GetMeDTO, HttpError>({
    queryKey: ['users-me'], 
    queryFn: getMe, 
  });

  return {
    data,
    error,
    isLoading,
    isError,
    refetch, 
  };
}


export default useGetMe