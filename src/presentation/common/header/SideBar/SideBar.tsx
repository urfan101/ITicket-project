import { Dialog, Modal, ModalOverlay } from 'react-aria-components'
import styles from './side-bar.module.scss'
import Logo from '../../shared/Logo/Logo'
import Close from '../../shared/Close/Close'
import SideBarList from '../SideBarList/SideBarList'
import SideBarSearch from '../SideBarSearch/SideBarSearch'


function SideBar() {
  
  return (
    <>
      <ModalOverlay className={styles['sideBar-Overlay']} isDismissable>
        <Modal isDismissable className={styles.sideBar}>
          <Dialog className={styles.sideBarDialog}>
            <div className={styles.sideUp}>
              <Logo></Logo>
              <Close slot="close"  ></Close>
            </div>
            <SideBarSearch></SideBarSearch>
            <SideBarList></SideBarList>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  )
}

export default SideBar
