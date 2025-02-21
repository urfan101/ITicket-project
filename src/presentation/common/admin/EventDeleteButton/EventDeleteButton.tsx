import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent } from "@/infrastructure/repositories/events";
import styles from './event-delete-button.module.scss';
import { EventDTO } from "@/infrastructure/dto/events";

interface EventDeleteButtonProps {
  eventId: string;
}

function EventDeleteButton({ eventId }: EventDeleteButtonProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteEventMutation, isPending, error } = useMutation({
    mutationFn: () => deleteEvent(eventId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['events'] });

      const previousEvents = queryClient.getQueryData<EventDTO[]>(['events']);

      queryClient.setQueryData(['events'], (oldData: EventDTO[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((event) => event.id !== eventId);
      });

      return { previousEvents };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousEvents) {
        queryClient.setQueryData(['events'], context.previousEvents);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const handleDeleteClick = () => {
    deleteEventMutation();
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

export default EventDeleteButton;
