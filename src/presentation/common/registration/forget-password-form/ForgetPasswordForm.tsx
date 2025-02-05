import styles from './forget-password.module.scss'
import { Form, Label, TextField } from "react-aria-components";
import StInput, { InputError } from "../../StInput";
import Button from '@presentation/common/registration/Button/Button'
import useRegister from "@/business/services/auth/useRegistration";
import { RegisterDTO } from "@/infrastructure/dto/auth";
import { NavLink } from 'react-router-dom';

function ForgetPasswordForm() {
  const { form, register } = useRegister();
  const handleSubmit = async (data: RegisterDTO) => {
    await register(data)
  }
  return (
    <>
      <Form className={styles.forgetForm} onSubmit={form.handleSubmit(handleSubmit)}>
        <TextField
          name="email"
          className={styles.forgetInput}
          onChange={value => form.setValue('email', value)}
          onBlur={() => form.trigger('email')}
          ref={form.register('email').ref}
        >
          <Label className={styles.label}>E-pochta</Label>
          <StInput />
          <InputError>{form.formState.errors.email?.message}</InputError>
        </TextField>

        <Button>Daxil Ol</Button>
        <p>Parolu <NavLink className={styles.navLink} to='/login'>Xatirlayirsiniz?</NavLink></p>
      </Form>
    </>
  )
}

export default ForgetPasswordForm
