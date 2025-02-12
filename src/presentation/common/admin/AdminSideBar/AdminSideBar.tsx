import AdminSideBarList from '../AdminSideBarList/AdminSideBarList'
import styles from './admin-side-bar.module.scss'

function AdminSideBar() {
  return (
    <>
      <div className={styles.sideBar}>
        <h2 className={styles.topText}>Admin panel</h2>
        <AdminSideBarList></AdminSideBarList>
      </div>
    </>
  )
}

export default AdminSideBar
