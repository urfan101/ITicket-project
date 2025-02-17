import { useParams } from "react-router-dom";
import EditVenuesForm from "@/presentation/common/admin/EditVenueForm/EditVenueForm";
import AuthorizedGuard from "@/presentation/guards/AuthorizedGuard";
import AdminGuard from "@/presentation/guards/AdminGuard";

function EditVenue() {
  const { venueId } = useParams<{ venueId: string }>();

  if (!venueId) {
    return <div>Venue ID is missing</div>;
  }

  return (
    <>
      <AuthorizedGuard />
      <AdminGuard />
      <EditVenuesForm venueId={venueId} />
    </>
  );
}

export default EditVenue;
