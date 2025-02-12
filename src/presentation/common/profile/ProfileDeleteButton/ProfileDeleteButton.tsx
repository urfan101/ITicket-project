// ProfileDeleteButton.tsx
import { useNavigate } from "react-router-dom"; 
import useDeleteMe from "@/business/services/user/useDeleteMe";
import styles from './profile-delete-button.module.scss'

function ProfileDeleteButton() {
  const { deleteMeMutation, isPending, error } = useDeleteMe();
  const navigate = useNavigate(); 

  const handleDeleteClick = async () => {
    try {
      await deleteMeMutation(); 
      navigate("/"); 
    } catch (err) {
      console.error("Error deleting account:", err); 
    }
  };

  return (
    <div>
      <button className={styles.button} onClick={handleDeleteClick} disabled={isPending}>
        Hesabi Sil
      </button>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>} 
    </div>
  );
}

export default ProfileDeleteButton;
