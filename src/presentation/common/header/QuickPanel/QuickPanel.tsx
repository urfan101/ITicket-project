import styles from './quick-panel.module.scss'
import { CiHeart } from "react-icons/ci"
import { GoSearch } from "react-icons/go"
import { FaShoppingCart } from "react-icons/fa"

function QuickPanel() {
  return (
    <div className={styles.icons_list}>
      <p className={styles.icons}><CiHeart /></p>
      <p className={styles.icons}><GoSearch /></p>
      <p className={styles.icons}><FaShoppingCart />  0</p>
    </div>
  )
}

export default QuickPanel
