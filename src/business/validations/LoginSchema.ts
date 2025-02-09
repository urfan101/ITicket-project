import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Düzgün e-poçt ünvanı daxil edin'),
  password: z
    .string()
    .min(6, 'Şifrə ən azı 6 simvol olmalıdır')
    .max(100, 'Şifrə maksimum 100 simvol olmalıdır'),
});
