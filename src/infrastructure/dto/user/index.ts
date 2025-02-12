export type GetMeDTO = {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  roles: string[]
}


export type UpdateMeDTO = {
  email: string,
  firstName: string,
  lastName: string
}