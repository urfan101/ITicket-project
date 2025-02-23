import { http } from "@/infrastructure/api";
import { ActiveEventDTO, ActiveEventsResponseDTO } from "@/infrastructure/dto/activeEvents";


export const getActiveEvents = async (): Promise<ActiveEventDTO[]> => {
  const response = await http<ActiveEventsResponseDTO>({
    url: "/events/active",
    method: "GET",
  });
  return response.data;
};

export const getActiveEventById = async (id: string): Promise<ActiveEventDTO> => {
  const response = await http<ActiveEventsResponseDTO>({
    url: `/events/active/${id}`,
    method: "GET",
  });

  const event = response.data.find(event => event.id === id);
  
  if (!event) {
    throw new Error(`Event with ID ${id} not found.`);
  }

  return event;
};


