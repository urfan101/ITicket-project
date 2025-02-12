import { z } from 'zod';

export const ProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Ad ən azı 2 simvol olmalıdır')
    .max(50, 'Ad maksimum 50 simvol olmalıdır'),
  lastName: z
    .string()
    .min(2, 'Soyad ən azı 2 simvol olmalıdır')
    .max(50, 'Soyad maksimum 50 simvol olmalıdır'),
  email: z.string().email('Düzgün e-poçt ünvanı daxil edin'),
});
