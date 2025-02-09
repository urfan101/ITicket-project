import DropDownList from "../DropDownList/DropDownList"
import styles from "./drop-down.module.scss"
import { Dialog, Modal, ModalOverlay } from 'react-aria-components'

function DropDown() {
  return (
    <>
      <ModalOverlay className={styles['dropDown-Overlay']} isDismissable>
        <Modal isDismissable className={styles.dropDown}>
          <Dialog className={styles.dropDownDialog}>
            <DropDownList></DropDownList>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  )
}

export default DropDown
