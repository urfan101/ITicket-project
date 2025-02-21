import { useState, useEffect } from "react";
import { Form } from "radix-ui";
import Button from "@presentation/common/registration/Button/Button";
import useGetEvents from "@/business/services/events/useGetEvents";
import useEditEvent from "@/business/services/events/useEditEvent";
import useGetVenues from "@/business/services/venues/useGetVenues";
import useGetCategories from "@/business/services/categories/useGetCategories";
import { UpdateEventDTO } from "@/infrastructure/dto/events";
import { InputError } from "../../StInput";
import styles from "./edit-events-form.module.scss";
import { Navigate, useNavigate } from "react-router-dom";

interface EditEventFormProps {
  eventId: string;
}

function EditEventForm({ eventId }: EditEventFormProps) {
  console.log("Received eventId in EditEventForm:", eventId);
  const { data: events, isLoading, isError, error } = useGetEvents();
  const { updateEvent, isPending } = useEditEvent();
  const { data: venues } = useGetVenues();
  const { data: categories } = useGetCategories();
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [availableTicketsCount, setAvailableTicketsCount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState(0);
  const [primaryImage, setPrimaryImage] = useState("");
  const [primaryImageName, setPrimaryImageName] = useState("");
  const [secondaryImages, setSecondaryImages] = useState<string[]>([]);
  const [secondaryImagesNames, setSecondaryImagesNames] = useState<string[]>([]);
  const [venueId, setVenueId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const event = events?.find((e) => e.id === eventId);

  useEffect(() => {
    if (event) {
      setEventName(event.name);
      setEventDescription(event.description);
      setAvailableTicketsCount(event.availableTicketsCount);
      setStartDate(event.startDate ? event.startDate.slice(0, 16) : "");
      setEndDate(event.endDate ? event.endDate.slice(0, 16) : "");
      setPrice(event.price);
      setPrimaryImage(event.primaryImage);
      setPrimaryImageName(event.primaryImageName);
      setSecondaryImages(event.secondaryImages || []);
      setSecondaryImagesNames(event.secondaryImagesNames || []);
      
      setVenueId(event.venueId || "");
      setCategoryId(event.categoryId || "");
    }
  }, [event]);  
  

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!event) return <div>Event not found</div>;

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    dateObj.setHours(dateObj.getHours() - 4); 
    return dateObj.toISOString(); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const updatedEventData: UpdateEventDTO = {
      name: eventName,
      description: eventDescription,
      availableTicketsCount,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      price,
      primaryImage,
      primaryImageName,
      secondaryImages,
      secondaryImagesNames,
      venueId,
      categoryId,
    };
  
    console.log("Updating event with:", { eventId, updatedEventData });
  
    await updateEvent({
      eventId,
      data: updatedEventData,
    });
  
    navigate("/admin/events");
  };

  const handleSecondaryImageChange = (index: number, value: string) => {
    const newImages = [...secondaryImages];
    newImages[index] = value;
    setSecondaryImages(newImages);
  };

  const handleSecondaryImageNameChange = (index: number, value: string) => {
    const newNames = [...secondaryImagesNames];
    newNames[index] = value;
    setSecondaryImagesNames(newNames);
  };

  return (
    <Form.Root className={styles.editEventForm} onSubmit={handleSubmit}>
      <Form.Field name="name">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Event Name</Form.Label>
          <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
        </div>
      </Form.Field>

      <Form.Field name="description">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Description</Form.Label>
          <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} rows={4} />
        </div>
      </Form.Field>

      <Form.Field name="startDate">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Start Date</Form.Label>
          <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
      </Form.Field>

      <Form.Field name="endDate">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>End Date</Form.Label>
          <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </Form.Field>

      <Form.Field name="availableTicketsCount">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Available Tickets</Form.Label>
          <input type="number" value={availableTicketsCount} onChange={(e) => setAvailableTicketsCount(Number(e.target.value))} />
        </div>
      </Form.Field>

      <Form.Field name="price">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Price</Form.Label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </div>
      </Form.Field>

      <Form.Field name="primaryImage">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Primary Image URL</Form.Label>
          <input type="text" value={primaryImage} onChange={(e) => setPrimaryImage(e.target.value)} />
        </div>
      </Form.Field>

      <Form.Field name="primaryImageName">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Primary Image Name</Form.Label>
          <input type="text" value={primaryImageName} onChange={(e) => setPrimaryImageName(e.target.value)} />
        </div>
      </Form.Field>

      <Form.Field name="secondaryImages">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Secondary Images</Form.Label>
          {secondaryImages.map((image, index) => (
            <div key={index}>
              <input type="text" value={image} onChange={(e) => handleSecondaryImageChange(index, e.target.value)} />
              <input type="text" value={secondaryImagesNames[index]} onChange={(e) => handleSecondaryImageNameChange(index, e.target.value)} />
            </div>
          ))}
        </div>
      </Form.Field>

      <Form.Field name="venueId">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Venue</Form.Label>
          <select value={venueId} onChange={(e) => setVenueId(e.target.value)}>
            <option value="">Select Venue</option>
            {venues?.map((venue) => (
              <option key={venue.id} value={venue.id}>{venue.name}</option>
            ))}
          </select>
        </div>
      </Form.Field>

      <Form.Field name="categoryId">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Category</Form.Label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Select Category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </Form.Field>

      <Button>{isPending ? "Updating..." : "Update Event"}</Button>
    </Form.Root>
  );
}

export default EditEventForm;
