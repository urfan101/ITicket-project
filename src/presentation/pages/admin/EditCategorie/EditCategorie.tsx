import { useParams } from "react-router-dom";
import EditCategorieForm from "@/presentation/common/admin/EditCategorieForm/EditCategorieForm";

function EditCategorie() {
  const { categoryId } = useParams<{ categoryId: string }>(); 

  if (!categoryId) {
    return <div>Category ID is missing</div>;
  }

  return (
    <>
      <EditCategorieForm categoryId={categoryId} />
    </>
  );
}

export default EditCategorie;
