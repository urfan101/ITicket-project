import LoginForm from '@presentation/common/registration/login-form/LoginForm'
import styles from './login.module.scss'
import UnauthorizedGuard from '@/presentation/guards/UnauthorizedGuard'

function Login() {
  
  return (
    <>
    <UnauthorizedGuard></UnauthorizedGuard>
      <div className={styles.LoginDiv}>
      <h2 className={styles.topText}>Daxil Ol</h2>
      <LoginForm></LoginForm>
      </div>
    </>
  )
}

export default Login
