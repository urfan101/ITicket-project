
export type ActiveEventDTO = {
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

export type ActiveEventsResponseDTO = {
  data: ActiveEventDTO[];
  currentPage: number;
  currentLimit: number;
  totalPages: number;
  total: number;
};


