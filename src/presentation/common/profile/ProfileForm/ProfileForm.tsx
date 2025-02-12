import styles from './profile-form.module.scss';
import { Form } from "radix-ui";
import { InputError } from "../../StInput";
import Button from '@presentation/common/registration/Button/Button';
import useGetMe from "@/business/services/user/useGetMe";
import useUpdateMe from "@/business/services/user/useUpdateMe";
import { UpdateMeDTO } from "@/infrastructure/dto/user";
import { useForm } from "react-hook-form"; 
import ProfileDeleteButton from '../ProfileDeleteButton/ProfileDeleteButton';

function ProfileForm() {
  const { data, isLoading, isError, error } = useGetMe(); 
  const { updateMe, isPending } = useUpdateMe(); 
  const form = useForm<UpdateMeDTO>(); 

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const handleSubmit = async (data: UpdateMeDTO) => {
    await updateMe(data);
  };

  return (
    <Form.Root className={styles.profileForm} onSubmit={form.handleSubmit(handleSubmit)}>
      <Form.Field name="firstName">
        <div className={styles.profileInput}>
          <Form.Label className={styles.label}>Ad</Form.Label>
          <input
            {...form.register("firstName")}
            defaultValue={data?.firstName} 
          />
          <InputError>{form.formState.errors.firstName?.message}</InputError>
        </div>
      </Form.Field>

      <Form.Field name="lastName">
        <div className={styles.profileInput}>
          <Form.Label className={styles.label}>Soyad</Form.Label>
          <input
            {...form.register("lastName")}
            defaultValue={data?.lastName} 
          />
          <InputError>{form.formState.errors.lastName?.message}</InputError>
        </div>
      </Form.Field>

      <Form.Field name="email">
        <div className={styles.profileInput}>
          <Form.Label className={styles.label}>E-posta</Form.Label>
          <input
            {...form.register("email")}
            defaultValue={data?.email} 
            disabled 
          />
          <InputError>{form.formState.errors.email?.message}</InputError>
        </div>
      </Form.Field>
      <div className={styles.buttons}>
      <Button>Yenilə</Button>
      <ProfileDeleteButton></ProfileDeleteButton>
      </div>
      
    </Form.Root>
  );
}

export default ProfileForm;
