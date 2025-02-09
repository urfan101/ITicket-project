import styles from "./header.module.scss"
import QuickPanel from "@presentation/common/header/QuickPanel/QuickPanel";
import BarButton from "@presentation/common/header/BarButton/BarButton";
import '@presentation/shared/global.scss'
import Logo from "../shared/Logo/Logo";
import HeaderNavigation from "@presentation/common/header/HeaderNavigation/HeaderNavigation";
import { DialogTrigger } from "react-aria-components";
import SideBar from "./SideBar/SideBar";
import DropDown from "./DropDown/DropDown";


function Header() {
  return (
    <header>
      <div className="container">
        <div className={styles.header}>
          <DialogTrigger>
            <SideBar></SideBar>
            <BarButton></BarButton>
          </DialogTrigger>
          <Logo></Logo>
          <HeaderNavigation></HeaderNavigation>
          <DialogTrigger>
          <QuickPanel></QuickPanel>
            <DropDown></DropDown>
          </DialogTrigger>
        </div>
      </div>
    </header>
  )
}

export default Header
