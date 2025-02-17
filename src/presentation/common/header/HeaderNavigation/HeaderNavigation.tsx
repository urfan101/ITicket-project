import useGetCategories from "@/business/services/categories/useGetCategories";
import styles from './Header-Navigation.module.scss'

function Navigation() {
  const { data, isLoading, isError, error } = useGetCategories();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const categories = data || [];


  return (
    <nav>
      <ul className={styles.navList}>
        {categories.map((category) => (
          <li className={styles.list} key={category.id}>{category.name}</li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
