import { NavLink } from 'react-router-dom'
import styles from './profile-list.module.scss'
import useLogout from '@/business/services/user/useLogout'
import { RxExit } from "react-icons/rx"

function ProfileList() {
  const {logout} = useLogout()
  return (
    <>
      <div className={styles.listDiv}>
        <h2 className={styles.topText}>Profil</h2>
        <ul className={styles.list}>
          <li>Menim sifarishlerim</li>
          <li><NavLink to="/forgetPassword">Shifreni yenile</NavLink></li>
          <li className={styles.exitButton} onClick={logout}>Chixish <span> <RxExit /></span></li>
        </ul>
      </div>
    </>
  )
}

export default ProfileList
