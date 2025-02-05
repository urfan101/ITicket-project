import styles from './side-bar-search.module.scss'
import { FaSearch } from "react-icons/fa";

function SideBarSearch() {
  return (
    <>
      <form className={styles.searchForm}>
        <input className={styles.search} type="text" placeholder='Axtar' />
        <div className={styles.icon}><FaSearch /></div>
      </form>
    </>
  )
}

export default SideBarSearch
