import styles from './quick-panel.module.scss'
import { CiHeart } from "react-icons/ci"
import { GoSearch } from "react-icons/go"
import { FaShoppingCart } from "react-icons/fa"
import { LuUserRound } from "react-icons/lu"
import { NavLink } from 'react-router-dom'

function QuickPanel() {
  return (
    <div className={styles.icons_list}>
      <p className={styles.icons}><CiHeart /></p>
      <p className={styles.icons}><GoSearch /></p>
      <p className={styles.icons}><FaShoppingCart />  <span> 0</span></p>
      <div className={styles.profile}> <NavLink to='/login'><LuUserRound /></NavLink>
    </div>
    </div>
  )
}

export default QuickPanel
