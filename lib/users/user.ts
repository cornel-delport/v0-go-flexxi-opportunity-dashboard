import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export const UserRegistrationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export type User = z.infer<typeof UserSchema>;
export type UserRegistration = z.infer<typeof UserRegistrationSchema>;

export const UserProfileSchema = UserSchema;

export type UserProfile = z.infer<typeof UserProfileSchema>;
