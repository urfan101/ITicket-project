import { useParams } from "react-router-dom";
import EditEventsForm from "@/presentation/common/admin/EditEventsForm/EditEventsForm";
import AuthorizedGuard from "@/presentation/guards/AuthorizedGuard";
import AdminGuard from "@/presentation/guards/AdminGuard";

function EditEvent() {
  const { eventId } = useParams<{ eventId: string }>();

  if (!eventId) {
    return <div>Event ID is missing</div>;
  }

  return (
    <>
      <AuthorizedGuard />
      <AdminGuard />
      <EditEventsForm eventId={eventId} />
    </>
  );
}

export default EditEvent;
