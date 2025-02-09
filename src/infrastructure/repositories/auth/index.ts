import { http } from "@/infrastructure/api";
import { ForgetPasswordDTO, LoginDTO, LoginResponseDTO, RegisterDTO, ResetPasswordDTO, SubmitRegisterDTO } from "@/infrastructure/dto/auth";



export const register = async (dto: RegisterDTO) => {
  return await http<void>({
    url: '/auth/register',
    method: 'POST',
    data: dto,
  });
};

export const login = async (dto: LoginDTO) => {
  return await http<LoginResponseDTO>({
    url: '/auth/login',
    method: 'POST',
    data: dto,
  });
};

export const submitRegister = async (dto: SubmitRegisterDTO) => {
  return await http<void>({
    url: '/auth/submit-registration',
    method: 'POST',
    data: dto,
  });
};

export const forgotPassword = async (dto: ForgetPasswordDTO) => {
  return await http<void>({
    url: '/auth/forgot-password',
    method: 'POST',
    data: dto,
  });
};

export const resetPassword = async (dto: ResetPasswordDTO) => {
  return await http<void>({
    url: '/auth/reset-password',
    method: 'POST',
    data: dto,
  });
};