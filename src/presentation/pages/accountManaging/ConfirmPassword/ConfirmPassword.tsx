import useSubmitAccount from "@/business/services/auth/useSubmitAccount"
import { useSearchParams } from "react-router-dom"


function ConfirmPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email")|| ""
  const token = searchParams.get("token")|| ""
  
  console.log("Email:", email)
  console.log("Token:", token)

  const {isPending} = useSubmitAccount({email, token})
  return (
    <>
      {
        isPending ? <p>Loading...</p> : <p>Redirecting...</p>
      }
    </>
  )
}

export default ConfirmPassword
