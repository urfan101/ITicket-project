import AdminGuard from '@/presentation/guards/AdminGuard'
import styles from './admin-dashboard.module.scss'
import AuthorizedGuard from '@/presentation/guards/AuthorizedGuard'

function AdminDashboard() {
  return (
    <>
      <AuthorizedGuard></AuthorizedGuard>
      <AdminGuard></AdminGuard>
      <h2 className={styles.topText}>Welcome Admin!</h2>
    </>
  )
}

export default AdminDashboard
