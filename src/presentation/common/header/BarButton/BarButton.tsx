import { FaBars } from "react-icons/fa6"
import styles from './bar-button.module.scss'
import { Button } from "react-aria-components"

type BarButton = {
  onPress?: () => void
}

function BarButton(props: BarButton) {
  return (
    <>
      <Button {...props} className={styles.barButton}><FaBars /></Button>
    </>
  )
}

export default BarButton
