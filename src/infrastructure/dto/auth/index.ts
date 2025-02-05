export type LoginDTO = {
  email: string,
  password: string
}



export type ForgetPasswordDTO = {
  email: string
}


export type ResetPasswordDTO = {
  email: string,
  token: string,
  newPassword: string
}


export type RegisterDTO = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  confirmPassword: string
}


export type SubmitRegisterDTO = {
  email: string,
  token: string
}

export type LoginResponseDTO = {
  accessToken: string
}