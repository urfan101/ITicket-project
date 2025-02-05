import NavigationButton from "@presentation/common/header/nav/NavigationButton"
import styles from './Header-Navigation.module.scss'

function HeaderNavigation() {
  return (
    <>
      <nav className={styles.navList}><NavigationButton link="/home">All events</NavigationButton></nav>
    </>
  )
}

export default HeaderNavigation
