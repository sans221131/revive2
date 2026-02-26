import { z } from 'zod';

export const ContactBase = {
  id: z.number().int().positive(),
  name: z.string().min(1).max(100),
  phone: z.string().min(1).max(20),
  email: z.string().email().max(150),
  city: z.string().min(1).max(100),
  created_at: z.string().optional(),
};

export const ContactSchema = z.object(ContactBase).partial({ created_at: true });

export const ContactInsertSchema = z.object({
  name: ContactBase.name,
  phone: ContactBase.phone,
  email: ContactBase.email,
  city: ContactBase.city,
});

export type Contact = z.infer<typeof ContactSchema>;
export type ContactInsert = z.infer<typeof ContactInsertSchema>;

export default ContactSchema;
