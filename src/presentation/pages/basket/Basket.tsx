import BasketList from "@/presentation/common/basket/basketList/BasketList"
import AuthorizedGuard from "@/presentation/guards/AuthorizedGuard"


function Basket() {
  return (
    <>
      <AuthorizedGuard></AuthorizedGuard>
      <BasketList></BasketList>
    </>
  )
}

export default Basket
