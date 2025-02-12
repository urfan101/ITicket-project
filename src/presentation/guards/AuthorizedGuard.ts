import useGetMe from "@/business/services/user/useGetMe"
import { showToasts } from "@/business/utils/showToasts"
import { useNavigate } from "react-router-dom"



function AuthorizedGuard() {
  const navigate = useNavigate()
  const { isError, isLoading} = useGetMe() 
  if (isError && !isLoading) {
    showToasts("Вы должны войти в аккаунт перед тем как посетить эту страницу", "warning")
    navigate('/login')
  }

  return null
}

export default AuthorizedGuard
