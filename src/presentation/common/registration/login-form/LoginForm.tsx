import styles from './login.module.scss'
import { Form, Label, TextField } from "react-aria-components";
import StInput, { InputError } from "../../StInput";
import Button from '@presentation/common/registration/Button/Button'
import useRegister from "@/business/services/auth/useRegistration";
import { RegisterDTO } from "@/infrastructure/dto/auth";
import { NavLink } from 'react-router-dom';

function LoginForm() {
  const { form, register } = useRegister();
  const handleSubmit = async (data: RegisterDTO) => {
    await register(data)
  }
  return (
    <>
      <Form className={styles.loginForm} onSubmit={form.handleSubmit(handleSubmit)}>
        <TextField
          name="email"
          className={styles.loginInput}
          onChange={value => form.setValue('email', value)}
          onBlur={() => form.trigger('email')}
          ref={form.register('email').ref}
        >
          <Label className={styles.label}>E-pochta</Label>
          <StInput />
          <InputError>{form.formState.errors.email?.message}</InputError>
        </TextField>

        <TextField
          name="password"
          className={styles.loginInput}
          onChange={value => form.setValue('password', value)}
          onBlur={() => form.trigger('password')}
          ref={form.register('password').ref}
        >
          <Label className={styles.label}>Şifrə</Label>
          <StInput type="password" />
          <InputError>{form.formState.errors.password?.message}</InputError>
        </TextField>
        <p>Parolu <NavLink className={styles.navLink} to='/forgetPassword'>Unutmusuzun?</NavLink></p>
        <Button>Daxil Ol</Button>
        <p>iNigga.AZ-da yenisiniz? <NavLink className={styles.navLink} to='/register'>Qeydiyyatdan kechin</NavLink></p>
      </Form>
    </>
  )
}

export default LoginForm
