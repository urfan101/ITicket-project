import Header from "@presentation/common/header/Header"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"


function MainLayout() {
  return (
    <>
      <Header></Header>
      <Outlet/>
      <ToastContainer />
    </>
  )
}

export default MainLayout
