
export type AddToBasketDTO = {
  row: number; 
  number: number; 
  eventId: string; 
};


export type BasketItemDTO = {
  row: number;
  number: number;
  eventId: string;
  eventName: string; 
};


export type BasketResponseDTO = {
  data: BasketItemDTO[];  
  totalCount: number;      
};


export type DeleteFromBasketDTO = {
  eventId: string; 
};
