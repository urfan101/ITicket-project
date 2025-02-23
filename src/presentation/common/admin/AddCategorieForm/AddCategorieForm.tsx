import { useState } from "react";
import { Form } from "radix-ui";
import Button from "@presentation/common/registration/Button/Button";
import useAddCategory from "@/business/services/categories/useAddCategories";
import { CategoriesDTO } from "@/infrastructure/dto/categories";
import { InputError } from "../../StInput";
import styles from './categories-add-form.module.scss'


function AddCategoryForm() {
  const { addCategory, isPending, error } = useAddCategory();
  const [categoryName, setCategoryName] = useState<string>("");
  const [categories, setCategories] = useState<CategoriesDTO[]>([]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim()) return;

    const newCategory = {
      id: (categories.length + 1).toString(),  
      name: categoryName,
    };

    await addCategory(newCategory);

    setCategoryName("");
  };

  return (
    <Form.Root className={styles.addCategoryForm} onSubmit={handleSubmit}>
      <h2 className={styles.topText}>Admin Categories</h2>
      <Form.Field name="name">
        <div className={styles.inputWrapper}>
          <Form.Label className={styles.label}>Category Name</Form.Label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
          />
          <InputError>{error?.message}</InputError>
        </div>
      </Form.Field>

      <Button>
        {isPending ? "Loading..." : "Add Category"}
      </Button>
    </Form.Root>
  );
}

export default AddCategoryForm;
