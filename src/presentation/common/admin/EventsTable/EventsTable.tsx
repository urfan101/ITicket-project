import styles from './events-table.module.scss'
import { useNavigate } from "react-router-dom";
import useGetEvents from "@/business/services/events/useGetEvents";
import EventDeleteButton from "../EventDeleteButton/EventDeleteButton";

function EventsTable() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetEvents();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const events = Array.isArray(data) ? data : [];
  

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.td}>
          <tr>
            <th>Primary Image</th>
            <th>Name</th>
            <th>Available Tickets</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className={styles.th}>
          {events.map((event) => (
            <tr key={event.id}>
              <td>
                <img src={event.primaryImage} alt={event.name} className={styles.image} />
              </td>
              <td>{event.name}</td>
              <td>{event.availableTicketsCount}</td>
              <td>
                <button onClick={() => navigate(`/admin/editEvents/${event.id}`)}>
                  Edit
                </button>
              </td>
              <td>
                <EventDeleteButton eventId={event.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default EventsTable;
