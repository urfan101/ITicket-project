import { useState } from "react";
import styles from "./event-seats.module.scss";

interface Seat {
  row: number;
  number: number;
  type: number;
}

interface EventSeatsProps {
  seats: Seat[][];  // Передаем сюда массив сидений
  onSeatSelect: (selectedSeats: Seat[][]) => void;
}

function EventSeats({ seats, onSeatSelect }: EventSeatsProps) {
  const [selectedSeats, setSelectedSeats] = useState<Seat[][]>(seats);

  const toggleSeat = (rowIndex: number, colIndex: number) => {
    const updatedSeats = selectedSeats.map((row, rIdx) =>
      row.map((seat, cIdx) => {
        if (rIdx === rowIndex && cIdx === colIndex && seat.type === 1) {
          return { ...seat, type: 2 }; // Селектируем место
        } else if (rIdx === rowIndex && cIdx === colIndex && seat.type === 2) {
          return { ...seat, type: 1 }; // Отменяем селект
        }
        return seat;
      })
    );

    setSelectedSeats(updatedSeats);
    onSeatSelect(updatedSeats);
  };

  return (
    <div
      className={styles.seatsGrid}
      style={{
        gridTemplateColumns: `repeat(${seats[0]?.length || 0}, 1fr)`, // Автоматическое определение количества колонок
      }}
    >
      {selectedSeats.map((row, rowIndex) =>
        row.map((seat, colIndex) => (
          <div
            key={`seat-${rowIndex}-${colIndex}`}
            className={`${styles.seat} ${seat.type === 1 ? styles.available : ""} ${seat.type === 2 ? styles.selected : ""}`}
            onClick={() => toggleSeat(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
}

export default EventSeats;
