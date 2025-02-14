import styles from './edit-categorie.module.scss';
import { Form } from "radix-ui";
import { InputError } from "../../StInput";
import Button from '@presentation/common/registration/Button/Button';
import useGetCategories from "@/business/services/categories/useGetCategories";
import useEditCategory from "@/business/services/categories/useEditCategorie";
import { UpdateCategoryDTO } from "@/infrastructure/dto/categories";
import { useForm } from "react-hook-form";
import CategoryDeleteButton from '../CategorieDeleteButton/CategorieDeleteButton';
import { useNavigate } from "react-router-dom";  

interface CategoryFormProps {
  categoryId: string;
}

function EditCategoryForm({ categoryId }: CategoryFormProps) {
  const { data: categories, isLoading, isError, error } = useGetCategories();
  const { updateCategory, isPending } = useEditCategory();
  const form = useForm<UpdateCategoryDTO>();
  const navigate = useNavigate();  

  const category = categories?.data.find(cat => cat.id === categoryId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!category) return <div>Category not found</div>;

  const handleSubmit = async (data: UpdateCategoryDTO) => {
    await updateCategory({ categoryId, data });
    navigate("/admin/categories");  
  };

  return (
    <Form.Root className={styles.categoryForm} onSubmit={form.handleSubmit(handleSubmit)}>
      <Form.Field name="name">
        <div className={styles.categoryInput}>
          <Form.Label className={styles.label}>Kategoriya Adı</Form.Label>
          <input
            {...form.register("name")}
            defaultValue={category.name}
          />
          <InputError>{form.formState.errors.name?.message}</InputError>
        </div>
      </Form.Field>

      <div className={styles.buttons}>
        <Button>{isPending ? "Yenilənir..." : "Yenilə"}</Button>
        <CategoryDeleteButton categoryId={categoryId} />
      </div>
    </Form.Root>
  );
}

export default EditCategoryForm;
