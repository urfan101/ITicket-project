import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import AdminSideBar from "../common/admin/AdminSideBar/AdminSideBar"

function AdminLayout() {
  return (
    <>
      <AdminSideBar></AdminSideBar>
      <Outlet/>
      <ToastContainer />
    </>
  )
}

export default AdminLayout
