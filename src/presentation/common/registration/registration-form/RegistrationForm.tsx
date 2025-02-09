import styles from './registration-form.module.scss';
import { Form } from "radix-ui";
import { InputError } from "../../StInput";
import Button from '@presentation/common/registration/Button/Button';
import useRegister from "@/business/services/auth/useRegistration";
import { RegisterDTO } from "@/infrastructure/dto/auth";
import { NavLink } from "react-router-dom";

function RegistrationForm() {
  const { form, register } = useRegister();

  const handleSubmit = async (data: RegisterDTO) => {
    await register(data);
  };

  return (
    <Form.Root className={styles.registerForm} onSubmit={form.handleSubmit(handleSubmit)}>
      <Form.Field name="firstName">
        <div className={styles.registerInput}>
          <Form.Label className={styles.label}>Ad</Form.Label>
          <input {...form.register("firstName")} />
          <InputError>{form.formState.errors.firstName?.message}</InputError>
        </div>
      </Form.Field>

      <Form.Field name="lastName">
        <div className={styles.registerInput}>
          <Form.Label className={styles.label}>Soyad</Form.Label>
          <input {...form.register("lastName")} />
          <InputError>{form.formState.errors.lastName?.message}</InputError>
        </div>
      </Form.Field>

      <Form.Field name="email">
        <div className={styles.registerInput}>
          <Form.Label className={styles.label}>E-posta</Form.Label>
          <input {...form.register("email")} />
          <InputError>{form.formState.errors.email?.message}</InputError>
        </div>
      </Form.Field>

      <Form.Field name="password">
        <div className={styles.registerInput}>
          <Form.Label className={styles.label}>Şifrə</Form.Label>
          <input {...form.register("password")} type="password" />
          <InputError>{form.formState.errors.password?.message}</InputError>
        </div>
      </Form.Field>

      <Form.Field name="confirmPassword">
        <div className={styles.registerInput}>
          <Form.Label className={styles.label}>Şifrənin təkrarı</Form.Label>
          <input {...form.register("confirmPassword")} type="password" />
          <InputError>{form.formState.errors.confirmPassword?.message}</InputError>
        </div>
      </Form.Field>

      <Button>Qeydiyyatdan keç</Button>
      <p>Artiq qeydiyyatdan keçmisiniz? <NavLink className={styles.navLink} to='/login'>Daxil olun</NavLink></p>
    </Form.Root>
  );
}

export default RegistrationForm;