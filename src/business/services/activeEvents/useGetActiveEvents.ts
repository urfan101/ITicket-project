  import { Refetch } from "@/business/common/types/refetch";
  import { HttpError } from "@/infrastructure/api/HttpError";
  import { useQuery } from "@tanstack/react-query";
  import { getActiveEvents } from "@/infrastructure/repositories/activeEvents"; 
  import { ActiveEventDTO } from "@/infrastructure/dto/activeEvents"; 

  type UseGetActiveEvents = {
    data: ActiveEventDTO[] | undefined;
    error: HttpError | null;
    isLoading: boolean;
    isError: boolean;
    refetch: Refetch<ActiveEventDTO[]>; 
  };

  const useGetActiveEvents = (): UseGetActiveEvents => {
    const { data, error, isLoading, isError, refetch } = useQuery<ActiveEventDTO[], HttpError>({
      queryKey: ['events'],
      queryFn: getActiveEvents,
    });

    return {
      data,
      error,
      isLoading,
      isError,
      refetch, 
    };
  };

  export default useGetActiveEvents;
