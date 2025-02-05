import { z } from 'zod';

export const RegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'Ad ən azı 3 simvol olmalıdır')
      .max(50, 'Ad maksimum 50 simvol olmalıdır'),
    lastName: z
      .string()
      .min(2, 'Soyad ən azı 3 simvol olmalıdır')
      .max(50, 'Soyad maksimum 50 simvol olmalıdır'),
    email: z.string().email('Düzgün e-poçt ünvanı daxil edin'),
    password: z
      .string()
      .min(6, 'Şifrə ən azı 6 simvol olmalıdır')
      .max(100, 'Şifrə maksimum 100 simvol olmalıdır'),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Şifrələr eyni olmalıdır',
      });
    }
  });