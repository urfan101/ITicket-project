import { NavLink } from 'react-router-dom';
import styles from './drop-down-button.module.scss';
import { Button } from "react-aria-components";
import { LuUserRound } from 'react-icons/lu';
import { getAccessToken } from '@infrastructure/utils/getAccessToken'; 

type DropDownButtonProps = {
  onPress?: () => void;
};

function DropDownButton(props: DropDownButtonProps) {
  const accessToken = getAccessToken();

  return (
    <>
      {accessToken ? (
        <Button  {...props} className={styles.profile}><LuUserRound /></Button>
      ) : (
        <div className={styles.profile}><NavLink to='/login'><LuUserRound /></NavLink></div>
      )}
    </>
  );
}

export default DropDownButton;

