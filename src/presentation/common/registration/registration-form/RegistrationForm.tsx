import { Form, Label, TextField } from "react-aria-components";
import StInput, { InputError } from "../../StInput";
import Button from '@presentation/common/registration/Button/Button'
import useRegister from "@/business/services/auth/useRegistration";
import { RegisterDTO } from "@/infrastructure/dto/auth";
import { NavLink } from "react-router-dom";
import styles from './registration-form.module.scss'

function RegistrationForm() {
  const { form, register } = useRegister();
  const handleSubmit = async (data: RegisterDTO) => {
    await register(data)
  }
  return (
    <Form className={styles.registerForm} onSubmit={form.handleSubmit(handleSubmit)}>
      <fieldset>
        <TextField
          name="firstName"
          className={styles.registerInput}
          onChange={value => form.setValue('firstName', value)}
          onBlur={() => form.trigger('firstName')}
          ref={form.register('firstName').ref}
        >
          <Label className={styles.label}>Ad</Label>
          <StInput />
          <InputError>{form.formState.errors.firstName?.message}</InputError>
        </TextField>
        <TextField
          name="lastName"
          className={styles.registerInput}
          onChange={value => form.setValue('lastName', value)}
          onBlur={() => form.trigger('lastName')}
          ref={form.register('lastName').ref}
        >
          <Label className={styles.label}>Soyad</Label>
          <StInput />
          <InputError>{form.formState.errors.lastName?.message}</InputError>
        </TextField>
      </fieldset>
      
      <TextField
        name="email"
        className={styles.registerInput}
        onChange={value => form.setValue('email', value)}
        onBlur={() => form.trigger('email')}
        ref={form.register('email').ref}
      >
        <Label className={styles.label}>E-posta</Label>
        <StInput />
        <InputError>{form.formState.errors.email?.message}</InputError>
      </TextField>
      
      <TextField
        name="password"
        className={styles.registerInput}
        onChange={value => form.setValue('password', value)}
        onBlur={() => form.trigger('password')}
        ref={form.register('password').ref}
      >
        <Label className={styles.label}>Şifrə</Label>
        <StInput type="password" />
        <InputError>{form.formState.errors.password?.message}</InputError>
      </TextField>
      <TextField
        name="confirmPassword"
        className={styles.registerInput}
        onChange={value => form.setValue('confirmPassword', value)}
        onBlur={() => form.trigger('confirmPassword')}
        ref={form.register('confirmPassword').ref}
      >
        <Label className={styles.label}>Şifrənin təkrarı</Label>
        <StInput type="password" />
        <InputError>{form.formState.errors.confirmPassword?.message}</InputError>
      </TextField>
      <Button>Qeydiyyatdan keç</Button>
      <p>Artiq qeydiyyatdant kechmisiniz? <NavLink className={styles.navLink} to='/login'>Daxil olun</NavLink></p>
    </Form>
  );
}

export default RegistrationForm
