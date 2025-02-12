import useGetMe from "@/business/services/user/useGetMe"
import { showToasts } from "@/business/utils/showToasts"
import { useNavigate } from "react-router-dom"



function UnauthorizedGuard() {
  const navigate = useNavigate()
  const { isError, isLoading} = useGetMe() 
  if (!isError && !isLoading) {
    showToasts("Чтобы зайти в эту страницу вы должны выйти из аккаунта", "warning")
    navigate('/')
  }

  return null
}

export default UnauthorizedGuard
