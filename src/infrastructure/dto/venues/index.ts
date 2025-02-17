export type AddVenueDTO = {
  name: string;
  description: string;
  address: string;
  seatsCount: number;
  seats: SeatRow[][];
};

export type VenueDTO = {
  id: string;
  name: string;
  description: string;
  address: string;
  seatsCount: number;
  seats: SeatRow[][];
};

export type SeatRow = {
  row: number;
  number: number;
  type: number;
};

export type VenuesResponseDTO = {
  data: VenueDTO[];
  currentPage: number;
  currentLimit: number;
  totalPages: number;
  total: number;
};

export type UpdateVenueDTO = {
  name?: string;
  description?: string;
  address?: string;
  seatsCount?: number;
  seats?: SeatRow[][];
};
