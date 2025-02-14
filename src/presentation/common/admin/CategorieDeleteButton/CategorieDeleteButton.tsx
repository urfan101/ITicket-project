import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "@/infrastructure/repositories/categories";
import styles from './categorie-delete-button.module.scss';

interface CategoryDeleteButtonProps {
  categoryId: string;
}

function CategoryDeleteButton({ categoryId }: CategoryDeleteButtonProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteCategoryMutation, isPending, error } = useMutation({
    mutationFn: () => deleteCategory(categoryId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['categories'] });

      const previousCategories = queryClient.getQueryData(['categories']);

      queryClient.setQueryData(['categories'], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((category: any) => category.id !== categoryId),
        };
      });

      return { previousCategories };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(['categories'], context.previousCategories);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const handleDeleteClick = () => {
    deleteCategoryMutation();
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleDeleteClick}
        disabled={isPending}
      >
        Delete
      </button>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </div>
  );
}

export default CategoryDeleteButton;
