import UnauthorizedGuard from '@/presentation/guards/UnauthorizedGuard'
import styles from './reset-password.module.scss'
import ResetPasswordForm from '@/presentation/common/registration/reset-password/ResetPasswordForm'


function ResetPassword() {
  return (
    <>
    <UnauthorizedGuard></UnauthorizedGuard>
      <div className={styles.ResetDiv}>
      <h2 className={styles.topText}>Parolu Tezele</h2>
      <ResetPasswordForm></ResetPasswordForm>
      </div>
    </>
  )
}

export default ResetPassword

