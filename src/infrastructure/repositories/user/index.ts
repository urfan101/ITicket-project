import { http } from "@/infrastructure/api";
import { GetMeDTO, UpdateMeDTO } from "@/infrastructure/dto/user";



export const getMe = async () => {
  return await http<GetMeDTO>({
    url: '/users/me',
    method: 'GET'
  });
};

export const deleteMe = async (): Promise<void> => {
  await http<GetMeDTO>({
    url: '/users/me',
    method: 'DELETE'
  });
};

export const updateMe = async (dto: UpdateMeDTO) => {
  return await http<void>({
    url: '/users/me',
    method: 'PUT',
    data: dto,
  });
};

