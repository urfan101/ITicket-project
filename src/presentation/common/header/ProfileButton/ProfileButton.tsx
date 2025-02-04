import styles from './profile-button.module.scss'
import { LuUserRound } from "react-icons/lu"

function ProfileButton() {
  return (
    <div className={styles.profile}>
      <LuUserRound />
    </div>
  )
}

export default ProfileButton
