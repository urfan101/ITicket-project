import { FC, ReactNode } from 'react';
import { Link } from 'react-aria-components';
import styles from './navigation-button.module.scss'
type NavigationButtonProps = {
    children: ReactNode;
    link: string;
};


const NavigationButton: FC<NavigationButtonProps> = ({ children, link }) => {
    return <Link href={link} className={styles.button}>
    {children}
  </Link>
};

export default NavigationButton;
