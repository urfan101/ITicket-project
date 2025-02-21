import { useState } from "react";
import { Form } from "radix-ui";
import Button from "@presentation/common/registration/Button/Button";
import useAddEvent from "@/business/services/events/useAddEvent";
import { InputError } from "../../StInput";
import styles from "./add-event-form.module.scss";
import useGetVenues from "@/business/services/venues/useGetVenues";
import useGetCategories from "@/business/services/categories/useGetCategories";

function AddEventForm() {
  const { addEvent, isPending, error } = useAddEvent();
  const { data: venues, isLoading: isLoadingVenues, isError: isErrorVenues, error: venuesError } = useGetVenues();
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories, error: categoriesError } = useGetCategories();
  
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [availableTicketsCount, setAvailableTicketsCount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState(0);
  const [primaryImage, setPrimaryImage] = useState("");
  const [primaryImageName, setPrimaryImageName] = useState("");
  const [secondaryImages, setSecondaryImages] = useState<string[]>([""]);
  const [secondaryImagesNames, setSecondaryImagesNames] = useState<string[]>([""]);
  const [venueId, setVenueId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!eventName.trim() || !eventDescription.trim() || !startDate || !endDate || !venueId || !categoryId) {
      console.error("Missing required fields");
      return;
    }
  
    const formatDate = (date: string) => {
      const dateObj = new Date(date);
      dateObj.setHours(dateObj.getHours() - 4); 
      return dateObj.toISOString(); 
    };
  
    const newEvent = {
      name: eventName,
      description: eventDescription,
      availableTicketsCount, 
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      price,
      primaryImage,
      primaryImageName,
      secondaryImages: secondaryImages.filter(img => img.trim() !== ""),
      secondaryImagesNames: secondaryImagesNames.filter(name => name.trim() !== ""),
      venueId,
      categoryId,
    };

    console.log("New Event Object:", newEvent);
    
    try {
      await addEvent(newEvent);
    } catch (err) {
      console.error("Error adding event:", err);
    }
  
    setEventName("");
    setEventDescription("");
    setAvailableTicketsCount(0);
    setStartDate("");
    setEndDate("");
    setPrice(0);
    setPrimaryImage("");
    setPrimaryImageName("");
    setSecondaryImages([""]);
    setSecondaryImagesNames([""]);
    setVenueId("");
    setCategoryId("");
  };
  
  

  const handleSecondaryImageChange = (index: number, value: string) => {
    const newImages = [...secondaryImages];
    newImages[index] = value;
    if (value.trim() !== "" && index === secondaryImages.length - 1) {
      newImages.push("");
    }
    setSecondaryImages(newImages);
  };

  const handleSecondaryImageNameChange = (index: number, value: string) => {
    const newNames = [...secondaryImagesNames];
    newNames[index] = value;
    if (value.trim() !== "" && index === secondaryImagesNames.length - 1) {
      newNames.push("");
    }
    setSecondaryImagesNames(newNames);
  };

  if (isLoadingVenues || isLoadingCategories) return <div>Loading...</div>;
  if (isErrorVenues || isErrorCategories) return <div>Error: {venuesError?.message || categoriesError?.message}</div>;


  const venuesList = venues || [];
  const categoriesList = categories || [];

  return (
    <Form.Root className={styles.addEventForm} onSubmit={handleSubmit}>
      <Form.Field name="name">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Event Name</Form.Label>
          <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Event Name" />
          <InputError>{error?.message}</InputError>
        </div>
      </Form.Field>

      <Form.Field name="description">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Description</Form.Label>
          <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder="Event Description" rows={4} />
          <InputError>{error?.message}</InputError>
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
              <input
                type="text"
                value={image}
                onChange={(e) => handleSecondaryImageChange(index, e.target.value)}
                placeholder="Secondary Image URL"
              />
              <input
                type="text"
                value={secondaryImagesNames[index]}
                onChange={(e) => handleSecondaryImageNameChange(index, e.target.value)}
                placeholder="Secondary Image Name"
              />
            </div>
          ))}
        </div>
      </Form.Field>

      <Form.Field name="venueId">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Venue</Form.Label>
          <select value={venueId} onChange={(e) => setVenueId(e.target.value)}>
            <option value="">Select Venue</option>
            {venuesList.map((venue) => (
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
            {categoriesList.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </Form.Field>

      <Button>{isPending ? "Loading..." : "Add Event"}</Button>
    </Form.Root>
  );
}

export default AddEventForm;
