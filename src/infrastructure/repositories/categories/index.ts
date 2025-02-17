import { http } from "@/infrastructure/api";
import { AddCategoriesDTO, CategoriesDTO, UpdateCategoryDTO } from "@/infrastructure/dto/categories";

export const getCategories = async (): Promise<CategoriesDTO[]> => {
  return await http<CategoriesDTO[]>({
    url: "/categories",
    method: "GET",
  });
};



export const addCategory = async (dto: AddCategoriesDTO) => {
  return await http<void>({
    url: "/categories",
    method: "POST",
    data: dto,
  });
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  await http<void>({
    url: `/categories/${categoryId}`,
    method: "DELETE",
  });
};


export const updateCategory = async (categoryId: string, dto: UpdateCategoryDTO) => {
  return await http<void>({
    url: `/categories/${categoryId}`,
    method: "PUT",
    data: dto,
  });
};



