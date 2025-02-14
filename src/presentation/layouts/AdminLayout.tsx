import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import AdminSideBar from "../common/admin/AdminSideBar/AdminSideBar"
import styles from './admin-layout.module.scss'

function AdminLayout() {
  return (
    <>
      
      <AdminSideBar></AdminSideBar>
      <div className={styles.mainContent}>
        <Outlet />
      </div>
      <ToastContainer />
    
    </>
  )
}

export default AdminLayout
