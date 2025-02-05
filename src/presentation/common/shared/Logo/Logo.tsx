import { NavLink } from 'react-router-dom'
import styles from './logo.module.scss'

function Logo() {
  return (
    <>
    <NavLink to="/">
    <h2 className={styles.logo}><span className={styles.logoSpan}>i</span>Nigga<span className={styles.logoSpan}>. <span className={styles.logoSpanEnd}>az</span></span></h2>
    </NavLink>
      
    </>
  )
}

export default Logo
