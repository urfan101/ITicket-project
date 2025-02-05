import styles from './side-bar-list.module.scss'

function SideBarList() {
  return (
    < >
      <div className={styles.listDiv}>
        <ul className={styles.list}>
          <li>Butun Tedbirler</li>
          <li>Konsert</li>
          <li>Tamasha</li>
          <li>Ushaqlar</li>
          <li>Idman</li>
          <li>Heyal Kahvesi</li>
        </ul>
      </div>
    </>
  )
}

export default SideBarList
