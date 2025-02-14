import AddCategoryForm from '@/presentation/common/admin/AddCategorieForm/AddCategorieForm'
import styles from './categories.module.scss'
import CategoriesTable from '@/presentation/common/admin/CategoriesTable/CategoriesTable'

function Categories() {
  return (
    <>
      <AddCategoryForm></AddCategoryForm>
      <CategoriesTable></CategoriesTable>
    </>
  )
}

export default Categories
