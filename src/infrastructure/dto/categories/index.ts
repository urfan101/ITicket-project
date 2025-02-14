
export type AddCategoriesDTO = {
  id: string,
  name: string,
}

export type CategoriesDTO = {
  id: string;
  name: string;
};

export type CategoriesResponseDTO = {
  data: CategoriesDTO[];   
  currentPage: number;      
  currentLimit: number;     
  totalPages: number;       
  total: number;            
};

export type UpdateCategoryDTO = {
  name: string;
};
