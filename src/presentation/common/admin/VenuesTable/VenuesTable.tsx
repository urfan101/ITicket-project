import styles from './venues-table.module.scss'
import { useNavigate } from "react-router-dom";
import useGetVenues from "@/business/services/venues/useGetVenues";
import VenueDeleteButton from "../VenueDeleteButton/VenueDeleteButton";

function VenuesTable() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetVenues();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const venues = Array.isArray(data) ? data : []; 

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.td}>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Seats Count</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className={styles.th}>
          {venues.map((venue) => (
            <tr key={venue.id}>
              <td>{venue.name}</td>
              <td>{venue.address}</td>
              <td>{venue.seatsCount}</td>
              <td>
                <button onClick={() => navigate(`/admin/editVenues/${venue.id}`)}>
                  Edit
                </button>
              </td>
              <td>
                <VenueDeleteButton venueId={venue.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default VenuesTable;

