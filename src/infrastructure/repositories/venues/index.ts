import { http } from "@/infrastructure/api";
import { AddVenueDTO, UpdateVenueDTO, VenueDTO, VenuesResponseDTO } from "@/infrastructure/dto/venues";

export const getVenues = async (): Promise<VenueDTO[]> => {
  const response = await http<VenuesResponseDTO>({
    url: "/venues",
    method: "GET",
  });
  return response.data;
};

export const addVenue = async (dto: AddVenueDTO) => {
  return await http<void>({
    url: "/venues",
    method: "POST",
    data: dto,
  });
};

export const deleteVenue = async (venueId: string): Promise<void> => {
  await http<void>({
    url: `/venues/${venueId}`,
    method: "DELETE",
  });
};

export const updateVenue = async (venueId: string, dto: UpdateVenueDTO) => {
  return await http<void>({
    url: `/venues/${venueId}`,
    method: "PUT",
    data: dto,
  });
};
