import styles from './drop-down-list.module.scss'

function DropDownList() {
  return (
    <>
      <div className={styles.listDiv}>
        <ul className={styles.list}>
          <li>Profil</li>
          <li>Menim sifarishlerim</li>
          <li>Chixish</li>
        </ul>
      </div>
    </>
  )
}

export default DropDownList
