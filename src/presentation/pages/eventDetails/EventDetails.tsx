import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./event-details.module.scss";
import useGetActiveEvents from "@/business/services/activeEvents/useGetActiveEvents";
import { ActiveEventDTO } from "@/infrastructure/dto/activeEvents";
import EventsSlider from "@/presentation/common/events/eventsSlider/EventsSlider";

function EventDetails() {
  const { eventId } = useParams();
  const { data, isLoading, isError, error } = useGetActiveEvents();
  const [event, setEvent] = useState<ActiveEventDTO | null>(null);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const foundEvent = data.find((e) => String(e.id) === String(eventId));
      setEvent(foundEvent || null);
    }
  }, [data, eventId]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!event) return <div>Event not found</div>;


  const secondaryImages = event.secondaryImages || [];

  return (
    <>
      <div className="container">
        <div className={styles.divUp}>
          <img src={event.primaryImage} alt={event.name} className={styles.image}/>
          <div className={styles.info}>
            <h2 className={styles.eventName}>{event.name}</h2>
            <h3 className={styles.eventInfo}><strong>Start Date:</strong> {event.startDate}</h3>
            <h3 className={styles.eventInfo}><strong>End Date:</strong> {event.endDate}</h3>
            <h3 className={styles.eventInfo}><strong>Available Tickets:</strong> {event.availableTicketsCount}</h3>
            <h3 className={styles.eventInfo}><strong>Price:</strong> {event.price} ₼</h3>
          </div>
        </div>
        <div className={styles.divDown}>
          <p>{event.description}</p>
        </div>
      </div>
      <EventsSlider images={secondaryImages}></EventsSlider>
    </>
  );
}

export default EventDetails;
