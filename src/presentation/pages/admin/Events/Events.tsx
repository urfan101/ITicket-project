import AddEventForm from "@/presentation/common/admin/AddEventForm/AddEventForm"
import EventsTable from "@/presentation/common/admin/EventsTable/EventsTable"
import AdminGuard from "@/presentation/guards/AdminGuard"
import AuthorizedGuard from "@/presentation/guards/AuthorizedGuard"


function Events() {
  return (
    <>
      <AuthorizedGuard></AuthorizedGuard>
      <AdminGuard></AdminGuard>
      <AddEventForm></AddEventForm>
      <EventsTable></EventsTable>
    </>
  )
}

export default Events
