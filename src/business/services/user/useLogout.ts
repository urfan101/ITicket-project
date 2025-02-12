
import { deleteAccessToken } from "@/business/utils/deleteAccessToken";
import {  useQueryClient } from "@tanstack/react-query";


type UseLogout = {
  logout: () => Promise<void>;
};

const useLogout = (): UseLogout => {
  const queryClient = useQueryClient();
  const logout = async () => {
    deleteAccessToken()
    await queryClient.invalidateQueries({ queryKey: ['users-me'] });
  }
  
  return {
    logout
  };
}


export default useLogout