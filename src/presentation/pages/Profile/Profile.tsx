import AuthorizedGuard from '@/presentation/guards/AuthorizedGuard'
import styles from './Profile.module.scss'
import ProfileForm from '@/presentation/common/profile/ProfileForm/ProfileForm'
import ProfileList from '@/presentation/common/profile/ProfileList/ProfileList'

function Profile() {
  return (
    <>
      <AuthorizedGuard></AuthorizedGuard>
      <div className='container'>
        <div className={styles.profileDiv}>
          <h2 className={styles.topText}>Shexsi Melumatlar</h2>
          <div className={styles.flex}>
          <ProfileForm></ProfileForm>
          <ProfileList></ProfileList>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
