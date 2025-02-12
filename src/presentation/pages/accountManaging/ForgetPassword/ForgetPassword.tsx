import UnauthorizedGuard from '@/presentation/guards/UnauthorizedGuard'
import styles from './forget-password.module.scss'
import ForgetPasswordForm from "@/presentation/common/registration/forget-password-form/ForgetPasswordForm"


function ForgetPassword() {
  return (
    <>
    <UnauthorizedGuard></UnauthorizedGuard>
      <div className={styles.ForgetDiv}>
      <h2 className={styles.topText}>Şifrəni Sıfırla</h2>
      <ForgetPasswordForm></ForgetPasswordForm>
      </div>
    </>
  )
}

export default ForgetPassword
