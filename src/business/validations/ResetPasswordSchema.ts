import { z } from 'zod';

export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, 'Parol ən azı 6 simvol olmalıdır')
      .max(100, 'Parol maksimum 100 simvol olmalıdır'),
    confirmNewPassword: z.string(),
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmNewPassword'],
        message: 'Şifrələr eyni olmalıdır',
      });
    }
  });
