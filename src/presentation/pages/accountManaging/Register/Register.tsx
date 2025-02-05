import styles from './register.module.scss'
import RegistrationForm from "@/presentation/common/registration/registration-form/RegistrationForm"


function Register() {
  return (
    <>
      <div className={styles.RegisterDiv}>
      <h2 className={styles.topText}>Qeydiyyat</h2>
      <RegistrationForm></RegistrationForm>
      </div>
    </>
  )
}

export default Register
