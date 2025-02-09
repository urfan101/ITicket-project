import styles from './forget-password.module.scss';
import { Form } from "radix-ui";
import { InputError } from "../../StInput";
import Button from '@presentation/common/registration/Button/Button';
import useForgetPassword from "@/business/services/auth/useForgetPassword"; 
import { ForgetPasswordDTO } from "@/infrastructure/dto/auth"; 
import { NavLink } from 'react-router-dom';

function ForgetPasswordForm() {
  const { form, forgetPassword, isPending } = useForgetPassword(); 

  const handleSubmit = async (data: ForgetPasswordDTO) => {
    await forgetPassword(data); 
  };

  return (
    <Form.Root className={styles.forgetForm} onSubmit={form.handleSubmit(handleSubmit)}>
      <Form.Field name="email">
        <div className={styles.forgetInput}>
          <Form.Label className={styles.label}>E-pochta</Form.Label>
          <input {...form.register("email")} />
          <InputError>{form.formState.errors.email?.message}</InputError>
        </div>
      </Form.Field>

      <Button>Daxil Ol</Button>
      <p>Parolu <NavLink className={styles.navLink} to='/login'>Xatirlayirsiniz?</NavLink></p>
    </Form.Root>
  );
}

export default ForgetPasswordForm;
