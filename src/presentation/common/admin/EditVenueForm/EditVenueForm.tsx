import { useState, useEffect } from "react";
import { Form } from "radix-ui";
import Button from "@presentation/common/registration/Button/Button";
import useGetVenues from "@/business/services/venues/useGetVenues";
import useEditVenue from "@/business/services/venues/useEditVenue";
import { UpdateVenueDTO, VenueDTO } from "@/infrastructure/dto/venues";
import { InputError } from "../../StInput";
import styles from './edit-venue-form.module.scss';

interface EditVenueFormProps {
  venueId: string;
}

function EditVenueForm({ venueId }: EditVenueFormProps) {
  const { data: venues, isLoading, isError, error } = useGetVenues();
  const { updateVenue, isPending } = useEditVenue();
  const [venueName, setVenueName] = useState<string>("");
  const [venueDescription, setVenueDescription] = useState<string>("");
  const [venueAddress, setVenueAddress] = useState<string>("");
  const [seats, setSeats] = useState<Array<Array<{ row: number; number: number; type: number }>>>([]);
  const [rows, setRows] = useState<number>(5);
  const [columns, setColumns] = useState<number>(5);

  const venue = venues?.find(v => v.id === venueId);

  useEffect(() => {
    if (venue) {
      setVenueName(venue.name);
      setVenueDescription(venue.description);
      setVenueAddress(venue.address);
      setSeats(venue.seats);
      setRows(venue.seats.length);
      setColumns(venue.seats[0]?.length || 5);
    }
  }, [venue]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!venue) return <div>Venue not found</div>;

  const calculateSeatsCount = (seats: Array<Array<{ row: number; number: number; type: number }>>) => {
    return seats.flat().filter(seat => seat.type === 1).length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!venueName.trim() || !venueDescription.trim() || !venueAddress.trim()) return;
  
    const seatsCount = calculateSeatsCount(seats);
  
    const updatedVenueData: UpdateVenueDTO = {
      name: venueName,
      description: venueDescription,
      address: venueAddress,
      seatsCount: seatsCount,
      seats: seats,
    };
  
    await updateVenue({
      venueId: venueId, 
      data: updatedVenueData, 
    });
  };

  const toggleSeat = (row: number, number: number) => {
    const newSeats = [...seats];
    const seat = newSeats[row][number];
    seat.type = seat.type === 1 ? 0 : 1;
    setSeats(newSeats);
  };

  const renderSeat = (row: number, number: number) => {
    const seat = seats[row]?.[number];
    if (!seat) return null;
    return (
      <div
        key={`seat-${row}-${number}`}
        className={styles.seat}
        style={{
          backgroundColor: seat.type === 1 ? "green" : "transparent",
        }}
        onClick={() => toggleSeat(row, number)}
      />
    );
  };

  const generateSeats = (rows: number, columns: number) => {
    const newSeats: Array<Array<{ row: number; number: number; type: number }>> = [];
    for (let row = 0; row < rows; row++) {
      const seatRow: Array<{ row: number; number: number; type: number }> = [];
      for (let col = 0; col < columns; col++) {
        seatRow.push({ row, number: col, type: 1 }); 
      }
      newSeats.push(seatRow); 
    }
    setSeats(newSeats); 
  };

  const handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRows = Number(e.target.value);
    setRows(newRows);
    generateSeats(newRows, columns);
  };

  const handleColumnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColumns = Number(e.target.value);
    setColumns(newColumns);
    generateSeats(rows, newColumns);
  };

  return (
    <Form.Root className={styles.editVenueForm} onSubmit={handleSubmit}>
      <Form.Field name="name">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Məkan adı</Form.Label>
          <input
            type="text"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            placeholder="Məkan adı"
          />
          <InputError>{error?.message}</InputError>
        </div>
      </Form.Field>

      <Form.Field name="description">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Təsvir</Form.Label>
          <textarea
            value={venueDescription}
            onChange={(e) => setVenueDescription(e.target.value)}
            placeholder="Məkanın təsviri"
            rows={4}
          />
          <InputError>{error?.message}</InputError>
        </div>
      </Form.Field>

      <Form.Field name="address">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Ünvan</Form.Label>
          <input
            type="text"
            value={venueAddress}
            onChange={(e) => setVenueAddress(e.target.value)}
            placeholder="Məkan ünvanı"
          />
          <InputError>{error?.message}</InputError>
        </div>
      </Form.Field>

      <div className={styles.rowColumnControls}>
        <label>
          Rəqəmli sətirlər:
          <input type="number" value={rows} onChange={handleRowChange} min="1" />
        </label>

        <label>
          Rəqəmli yerlər:
          <input type="number" value={columns} onChange={handleColumnChange} min="1" />
        </label>
      </div>

      <div className={styles.seatsContainer}>
        <div
          className={styles.seatsGrid}
          style={{
            gridTemplateColumns: `repeat(${columns})`,
          }}
        >
          {seats.map((row, rowIndex) => (
            <div className={styles.seatRow} key={`row-${rowIndex}`}>
              {row.map((seat, colIndex) => renderSeat(rowIndex, colIndex))}
            </div>
          ))}
        </div>
      </div>

      <Button>{isPending ? "Yenilənir..." : "Yenilə"}</Button>
    </Form.Root>
  );
}

export default EditVenueForm;
