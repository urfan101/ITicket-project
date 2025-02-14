import { useNavigate } from "react-router-dom";
import CategoryDeleteButton from "../CategorieDeleteButton/CategorieDeleteButton";
import useGetCategories from "@/business/services/categories/useGetCategories";

function CategoriesTable() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetCategories();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const categories = data?.data || [];

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button onClick={() => navigate(`/admin/editCategories/${category.id}`)}>
                  Edit
                </button>
              </td>
              <td>
                <CategoryDeleteButton categoryId={category.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default CategoriesTable