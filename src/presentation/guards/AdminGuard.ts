import useGetMe from "@/business/services/user/useGetMe";
import { showToasts } from "@/business/utils/showToasts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminGuard() {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useGetMe();

  useEffect(() => {
    if (!isLoading) {
      if (isError || !data || !data.roles.includes("Admin")) {
        showToasts("У вас нет доступа к этой странице", "error");
        navigate("/");
      }
    }
  }, [data, isError, isLoading, navigate]);

  return null;
}

export default AdminGuard;
