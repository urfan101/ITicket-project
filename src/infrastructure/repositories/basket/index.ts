import { http } from "@/infrastructure/api";
import { AddToBasketDTO, BasketResponseDTO, DeleteFromBasketDTO } from "@/infrastructure/dto/basket";


export const getBasket = async (): Promise<BasketResponseDTO> => {
  return await http<BasketResponseDTO>({
    url: "/basket",
    method: "GET",
  });
};


export const addToBasket = async (dto: AddToBasketDTO) => {
  return await http<void>({
    url: "/basket",
    method: "POST",
    data: dto,
  });
};


export const deleteFromBasket = async (dto: DeleteFromBasketDTO): Promise<void> => {
  await http<void>({
    url: `/basket/${dto.eventId}`,
    method: "DELETE",
  });
};
