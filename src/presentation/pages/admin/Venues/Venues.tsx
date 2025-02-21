import AddVenueForm from "@/presentation/common/admin/AddVenueForm/AddVenueForm"
import VenuesTable from "@/presentation/common/admin/VenuesTable/VenuesTable"
import AdminGuard from "@/presentation/guards/AdminGuard"
import AuthorizedGuard from "@/presentation/guards/AuthorizedGuard"


function Venues() {
  return (
    <>
      <AuthorizedGuard></AuthorizedGuard>
      <AdminGuard></AdminGuard>
      <AddVenueForm></AddVenueForm>
      <VenuesTable></VenuesTable>
    </>
  )
}

export default Venues
