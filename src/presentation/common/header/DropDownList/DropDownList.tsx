import useLogout from '@business/services/user/useLogout'
import styles from './drop-down-list.module.scss'
import { NavLink } from 'react-router-dom'

function DropDownList() {
  const {logout} = useLogout()
  return (
    <>
      <div className={styles.listDiv}>
        <ul className={styles.list}>
          <li><NavLink to="/profile">Profil</NavLink></li>
          <li>Menim sifarishlerim</li>
          <li onClick={logout}>Chixish</li>
        </ul>
      </div>
    </>
  )
}

export default DropDownList
