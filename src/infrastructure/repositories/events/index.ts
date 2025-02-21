import { http } from "@/infrastructure/api";
import { AddEventDTO, UpdateEventDTO, EventDTO, EventsResponseDTO } from "@/infrastructure/dto/events";

export const getEvents = async (): Promise<EventDTO[]> => {
  const response = await http<EventsResponseDTO>({
    url: "/events",
    method: "GET",
  });
  return response.data;
};

export const addEvent = async (dto: AddEventDTO) => {
  return await http<void>({
    url: "/events",
    method: "POST",
    data: dto,
  });
};

export const deleteEvent = async (eventId: string): Promise<void> => {
  await http<void>({
    url: `/events/${eventId}`,
    method: "DELETE",
  });
};

export const updateEvent = async (eventId: string, dto: UpdateEventDTO) => {
  console.log("Sending update request:", { eventId, dto });
  return await http<void>({
    url: `/events/${eventId}`,
    method: "PUT",
    data: dto,
  });
};
