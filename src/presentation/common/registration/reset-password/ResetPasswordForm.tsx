import styles from './resetPassword.module.scss';
import { Form } from "radix-ui";
import { InputError } from "../../StInput";
import Button from '@presentation/common/registration/Button/Button';
import useResetPassword from "@/business/services/auth/useResetPassword"; 
import { ResetPasswordDTO } from "@/infrastructure/dto/auth";
import { NavLink, useSearchParams } from "react-router-dom"; 
import { useForm } from "react-hook-form"; 

function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const { mutateAsync, isPending } = useResetPassword();

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordDTO>();

  const handleSubmitForm = async (data: ResetPasswordDTO) => {
    if (email && token) {
      try {
        const encodedToken = encodeURIComponent(token);

        await mutateAsync({ ...data, email, token: encodedToken });
      } catch (error) {
        console.error("Error resetting password:", error);
      }
    } else {
      console.error("Email or token is missing");
    }
  };

  return (
    <Form.Root className={styles.resetPasswordForm} onSubmit={handleSubmit(handleSubmitForm)}>
      <Form.Field name="newPassword">
        <div className={styles.resetInput}>
          <Form.Label className={styles.label}>Yeni Şifrə</Form.Label>
          <input
            type="password"
            {...register("newPassword", { required: "Şifrə tələb olunur" })}
          />
          <InputError>{errors.newPassword?.message}</InputError>
        </div>
      </Form.Field>

      <Button >Şifrəni Dəyişdir</Button>

      <p>
        Yeni parol müəyyənləşdirməkdə çətinlik çəkirsiniz? <NavLink className={styles.navLink} to="/login">Geri Dönün</NavLink>
      </p>
    </Form.Root>
  );
}

export default ResetPasswordForm;
