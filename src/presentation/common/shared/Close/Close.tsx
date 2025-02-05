import { ImCross } from "react-icons/im";
import styles from './close.module.scss'
import { Button } from "react-aria-components";

type SideBarClose = {
  onPress?: () => void
  slot: string
}

function SideBarClose(props: SideBarClose) {
  return (
    <>
      <Button {...props} className={styles.crossButton}><ImCross /></Button>
    </>
  )
}

export default SideBarClose
