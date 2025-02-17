import { useState } from "react";
import { Form } from "radix-ui";
import Button from "@presentation/common/registration/Button/Button";
import useAddVenue from "@/business/services/venues/useAddVenue";
import { VenueDTO } from "@/infrastructure/dto/venues";
import { InputError } from "../../StInput";
import styles from './add-venue-form.module.scss';

function AddVenueForm() {
  const { addVenue, isPending, error } = useAddVenue();
  const [venueName, setVenueName] = useState<string>("");
  const [venueDescription, setVenueDescription] = useState<string>("");
  const [venueAddress, setVenueAddress] = useState<string>("");
  const [seats, setSeats] = useState<Array<Array<{ row: number; number: number; type: number }>>>([]);
  const [rows, setRows] = useState<number>(5);
  const [columns, setColumns] = useState<number>(5);
  const [isSeatsGridVisible, setIsSeatsGridVisible] = useState<boolean>(false);

  // Функция для подсчета количества мест с type: 1
  const calculateSeatsCount = (seats: Array<Array<{ row: number; number: number; type: number }>>) => {
    return seats.flat().filter(seat => seat.type === 1).length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!venueName.trim() || !venueDescription.trim() || !venueAddress.trim()) return;

    const seatsCount = calculateSeatsCount(seats);

    const newVenue: VenueDTO = {
      id: "new", // Здесь может быть логика для уникального ID
      name: venueName,
      description: venueDescription,
      address: venueAddress,
      seatsCount: seatsCount,
      seats: seats,
    };

    await addVenue(newVenue);

    setVenueName("");
    setVenueDescription("");
    setVenueAddress("");
    setSeats([]);
  };

  const toggleSeat = (row: number, number: number) => {
    const newSeats = [...seats];
    const seat = newSeats[row][number];
    seat.type = seat.type === 1 ? 0 : 1;
    setSeats(newSeats);
  };

  const renderSeat = (row: number, number: number) => {
    const seat = seats[row]?.[number];
    if (!seat) return null; // защита от ошибок, если seat не существует
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

  const toggleSeatsGridVisibility = () => {
    setIsSeatsGridVisible(!isSeatsGridVisible);
    generateSeats(rows, columns);
  };

  return (
    <Form.Root className={styles.addVenueForm} onSubmit={handleSubmit}>
      <Form.Field name="name">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Məkan adı</Form.Label>
          <input
            type="text"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            placeholder="Yeni məkan adı"
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
        <button type="button" onClick={toggleSeatsGridVisibility}>
          Yeniden yarat
        </button>

        {isSeatsGridVisible && (
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
        )}
      </div>

      <Button>
        {isPending ? "Yüklənir..." : "Yeni Məkan Əlavə Et"}
      </Button>
    </Form.Root>
  );
}

export default AddVenueForm;
