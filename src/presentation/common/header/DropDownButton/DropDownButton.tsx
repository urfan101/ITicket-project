import { NavLink } from 'react-router-dom';
import styles from './drop-down-button.module.scss';
import { Button } from "react-aria-components";
import { LuUserRound } from 'react-icons/lu';
import useGetMe from '@/business/services/user/useGetMe';
import { getAccessToken } from '@/infrastructure/utils/getAccessToken';

type DropDownButtonProps = {
  onPress?: () => void;
};

function DropDownButton(props: DropDownButtonProps) {
  const {isLoading} = useGetMe();
  const accesToken = getAccessToken()

  if (!accesToken) {
    return <div className={styles.profileLink}><NavLink to='/login'><LuUserRound /></NavLink></div>
  }

  if (isLoading) {
    return <p>Loading...</p>
  } 
  return (
    <>
      <Button  {...props} className={styles.profile}><LuUserRound /></Button>
    </>
  );
}

export default DropDownButton;

