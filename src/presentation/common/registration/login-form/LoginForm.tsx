import styles from './login.module.scss';
import { Form } from "radix-ui";
import { InputError } from "../../StInput";
import Button from '@presentation/common/registration/Button/Button';
import useLogin from "@/business/services/auth/useLogin";
import { LoginDTO } from "@/infrastructure/dto/auth";
import { NavLink } from 'react-router-dom';

function LoginForm() {
  const { form, login } = useLogin();

  const handleSubmit = async (data: LoginDTO) => {
    await login(data);
  };

  return (
    <Form.Root className={styles.loginForm} onSubmit={form.handleSubmit(handleSubmit)}>
      <Form.Field
        name="email"
      >
        <div className={styles.loginInput}>
        <Form.Label className={styles.label}>E-pochta</Form.Label>
        <input {...form.register("email")}/>
        <InputError>{form.formState.errors.email?.message}</InputError>
        </div>
      </Form.Field>

      <Form.Field
        name="password"
        className={styles.loginInput}
      >
        <Form.Label className={styles.label}>Şifrə</Form.Label>
        <Form.Control asChild><input {...form.register("password")} type="password" /></Form.Control>
        <InputError>{form.formState.errors.password?.message}</InputError>
      </Form.Field>

      <p>
        Parolu <NavLink className={styles.navLink} to='/forgetPassword'>Unutmusuzun?</NavLink>
      </p>

      <Button>Daxil Ol</Button>

      <p>
        iNigga.AZ-da yenisiniz? <NavLink className={styles.navLink} to='/register'>Qeydiyyatdan kechin</NavLink>
      </p>
    </Form.Root>
  );
}

export default LoginForm;
