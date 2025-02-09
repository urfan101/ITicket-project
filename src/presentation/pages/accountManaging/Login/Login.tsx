import LoginForm from '@presentation/common/registration/login-form/LoginForm'
import styles from './login.module.scss'

function Login() {
  
  return (
    <>
      <div className={styles.LoginDiv}>
      <h2 className={styles.topText}>Daxil Ol</h2>
      <LoginForm></LoginForm>
      </div>
    </>
  )
}

export default Login
