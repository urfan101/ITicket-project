import { Refetch } from "@/business/common/types/refetch";
import { HttpError } from "@/infrastructure/api/HttpError";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/infrastructure/repositories/events";
import { EventDTO } from "@/infrastructure/dto/events";  

type UseGetEvents = {
  data: EventDTO[] | undefined;
  error: HttpError | null;
  isLoading: boolean;
  isError: boolean;
  refetch: Refetch<EventDTO[]>; 
};

const useGetEvents = (): UseGetEvents => {
  const { data, error, isLoading, isError, refetch } = useQuery<EventDTO[], HttpError>({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  return {
    data,
    error,
    isLoading,
    isError,
    refetch, 
  };
};

export default useGetEvents;
