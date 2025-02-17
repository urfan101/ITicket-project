import { useParams } from "react-router-dom";
import EditCategorieForm from "@/presentation/common/admin/EditCategorieForm/EditCategorieForm";
import AuthorizedGuard from "@/presentation/guards/AuthorizedGuard";
import AdminGuard from "@/presentation/guards/AdminGuard";

function EditCategorie() {
  const { categoryId } = useParams<{ categoryId: string }>(); 

  if (!categoryId) {
    return <div>Category ID is missing</div>;
  }

  return (
    <>
      <AuthorizedGuard></AuthorizedGuard>
      <AdminGuard></AdminGuard>
      <EditCategorieForm categoryId={categoryId} />
    </>
  );
}

export default EditCategorie;
