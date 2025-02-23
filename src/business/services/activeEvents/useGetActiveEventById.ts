import { useQuery } from "@tanstack/react-query";
import { getActiveEventById } from "@/infrastructure/repositories/activeEvents"; 
import { ActiveEventDTO } from "@/infrastructure/dto/activeEvents"; 
import { HttpError } from "@/infrastructure/api/HttpError";
import { Refetch } from "@/business/common/types/refetch";

type UseGetActiveEventById = {
  data: ActiveEventDTO | undefined;
  error: HttpError | null;
  isLoading: boolean;
  isError: boolean;
  refetch: Refetch<ActiveEventDTO | undefined>; 
};

const useGetActiveEventById = (eventId: string): UseGetActiveEventById => {
  const { data, error, isLoading, isError, refetch } = useQuery<ActiveEventDTO, HttpError>({
    queryKey: ['event', eventId], 
    queryFn: () => getActiveEventById(eventId), 
    enabled: !!eventId, 
  });

  return {
    data,
    error,
    isLoading,
    isError,
    refetch,
  };
};

export default useGetActiveEventById;
