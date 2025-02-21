export type AddEventDTO = {
  name: string;
  description: string;
  availableTicketsCount: number;
  startDate: string;
  endDate: string;
  venueId: string;
  categoryId: string;
  price: number;
  primaryImage: string;
  primaryImageName: string; 
  secondaryImages: string[];
  secondaryImagesNames: string[]; 
};

export type EventDTO = {
  id: string;
  name: string;
  description: string;
  availableTicketsCount: number;
  startDate: string;
  endDate: string;
  venueId: string;
  categoryId: string;
  price: number;
  primaryImage: string;
  primaryImageName: string; 
  secondaryImages: string[];
  secondaryImagesNames: string[]; 
};

export type EventsResponseDTO = {
  data: EventDTO[];
  currentPage: number;
  currentLimit: number;
  totalPages: number;
  total: number;
};

export type UpdateEventDTO = {
  name?: string;
  description?: string;
  availableTicketsCount?: number;
  startDate?: string;
  endDate?: string;
  venueId?: string;
  categoryId?: string;
  price?: number;
  primaryImage?: string;
  primaryImageName?: string; 
  secondaryImages?: string[];
  secondaryImagesNames?: string[]; 
};
