import NavigationButton from "@presentation/common/header/nav/NavigationButton";
import styles from "./header.module.scss"
import QuickPanel from "@presentation/common/header/QuickPanel/QuickPanel";
import ProfileButton from "@presentation/common/header/ProfileButton/ProfileButton";
import '@presentation/shared/global.scss'


function Header() {
  return (
    <div className="container">
      <nav className={styles.header}>
        <h1 className={styles.logo}><span className={styles.logoSpan}>i</span>Nigga<span className={styles.logoSpan}>.az</span></h1>
        <NavigationButton link="/home">All events</NavigationButton>
        <QuickPanel></QuickPanel>
        <ProfileButton></ProfileButton>
      </nav>
    </div>
  )
}

export default Header
