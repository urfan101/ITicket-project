import { useNavigate } from "react-router-dom";
import styles from "./events-list.module.scss"
import useGetActiveEvents from "@/business/services/activeEvents/useGetActiveEvents"; 
import { RoutePath } from "@/presentation/shared/configs/rootConfig";

function EventsList() {
  const { data, isLoading, isError, error } = useGetActiveEvents();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const events = Array.isArray(data) ? data : [];

  const handleEventClick = (eventId: string | number) => {
    navigate(RoutePath.event_details.replace(":eventId", String(eventId)));
  };
  

  return (
    <div className="container">
      <h2 className={styles.topText}>Butun Eventler</h2>
      <div className={styles.eventsList}>
        {events.map((event) => (
          <div 
            key={event.id} 
            className={styles.eventCard} 
            onClick={() => handleEventClick(event.id)} 
          >
            <img src={event.primaryImage} alt={event.name} className={styles.image} />
            <div className={styles.cardInfo}>
              <h3>{event.name}</h3>
            </div>
            <span className={styles.price}>{event.price} ₼-dan</span>
          </div>
        ))}
      </div>
    </div>
  );
}


export default EventsList;
