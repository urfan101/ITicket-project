import AdminGuard from '@/presentation/guards/AdminGuard'
import styles from './admin-dashboard.module.scss'
import AuthorizedGuard from '@/presentation/guards/AuthorizedGuard'

function AdminDashboard() {
  return (
    <>
      <AuthorizedGuard></AuthorizedGuard>
      <AdminGuard></AdminGuard>
    </>
  )
}

export default AdminDashboard
