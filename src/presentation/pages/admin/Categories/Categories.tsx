import AddCategoryForm from '@/presentation/common/admin/AddCategorieForm/AddCategorieForm'

import CategoriesTable from '@/presentation/common/admin/CategoriesTable/CategoriesTable'
import AuthorizedGuard from '@/presentation/guards/AuthorizedGuard'
import AdminGuard from '@/presentation/guards/AdminGuard'

function Categories() {
  return (
    <>
      <AuthorizedGuard></AuthorizedGuard>
      <AdminGuard></AdminGuard>
      <AddCategoryForm></AddCategoryForm>
      <CategoriesTable></CategoriesTable>
    </>
  )
}

export default Categories
