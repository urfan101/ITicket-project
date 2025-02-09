import { z } from 'zod';

export const ForgetPasswordSchema = z.object({
  email: z.string().email('Düzgün e-poçt ünvanı daxil edin'),
});
