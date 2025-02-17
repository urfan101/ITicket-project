import { Refetch } from "@/business/common/types/refetch";
import { HttpError } from "@/infrastructure/api/HttpError";
import { useQuery } from "@tanstack/react-query";
import { getVenues } from "@/infrastructure/repositories/venues";
import { VenueDTO } from "@/infrastructure/dto/venues";  

type UseGetVenues = {
  data: VenueDTO[] | undefined;
  error: HttpError | null;
  isLoading: boolean;
  isError: boolean;
  refetch: Refetch<VenueDTO[]>; 
};

const useGetVenues = (): UseGetVenues => {
  const { data, error, isLoading, isError, refetch } = useQuery<VenueDTO[], HttpError>({
    queryKey: ['venues'],
    queryFn: getVenues,
  });

  return {
    data,
    error,
    isLoading,
    isError,
    refetch, 
  };
};

export default useGetVenues;
