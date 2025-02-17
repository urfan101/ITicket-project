import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVenue } from "@/infrastructure/repositories/venues";
import styles from './venue-delete-button.module.scss';
import { VenueDTO } from "@/infrastructure/dto/venues";

interface VenueDeleteButtonProps {
  venueId: string;
}

function VenueDeleteButton({ venueId }: VenueDeleteButtonProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteVenueMutation, isPending, error } = useMutation({
    mutationFn: () => deleteVenue(venueId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['venues'] });

      const previousVenues = queryClient.getQueryData<VenueDTO[]>(['venues']);

      queryClient.setQueryData(['venues'], (oldData: VenueDTO[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((venue) => venue.id !== venueId);
      });

      return { previousVenues };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousVenues) {
        queryClient.setQueryData(['venues'], context.previousVenues);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['venues'] });
    },
  });

  const handleDeleteClick = () => {
    deleteVenueMutation();
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleDeleteClick}
        disabled={isPending}
      >
        Delete
      </button>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </div>
  );
}

export default VenueDeleteButton;
