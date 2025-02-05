import { ReactNode } from 'react'
import styles from './Button.module.scss'

type Button = {
  children: ReactNode,
}

function Button(props: Button) {
  return (
    <>
      <button className={styles.button}>{props.children}</button>
    </>
  )
}

export default Button
