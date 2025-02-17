import { NavLink } from 'react-router-dom'
import styles from './admin-side-bar-list.module.scss'

function AdminSideBarList() {
  return (
    <>
      <div className={styles.listDiv}>
        <ul className={styles.list}>
          <li><NavLink to='categories'>Kategorialar</NavLink></li>
          <li><NavLink to='venues'>Eventler</NavLink></li>
        </ul>
      </div>
    </>
  )
}

export default AdminSideBarList
