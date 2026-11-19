import { z } from 'zod';

// Shared by the form (client) and the API route (server). The client builds the schema with
// translated messages; the server uses the English defaults (its messages are never shown).
export const REQUEST_TYPE_VALUES = ['purchasing', 'supply', 'import', 'export', 'partnership', 'other'] as const;
export type RequestType = (typeof REQUEST_TYPE_VALUES)[number];

// English labels: used in the e-mail that reaches the company
export const REQUEST_TYPE_LABELS: Record<RequestType, string> = {
  purchasing: 'Product Purchasing',
  supply: 'Product Supply',
  import: 'Import',
  export: 'Export',
  partnership: 'Business Partnership',
  other: 'Other Inquiries',
};

export type ContactMessages = {
  name: string;
  type: string;
  email: string;
  phone: string;
  contactRequired: string;
  message: string;
};

export const defaultMessages: ContactMessages = {
  name: 'Please enter your full name.',
  type: 'Please choose a request type.',
  email: 'Please enter a valid email address.',
  phone: 'Please enter a valid phone number.',
  contactRequired: 'Please give an email or a phone number so we can reply.',
  message: 'Please keep the details under 2000 characters.',
};

export function createContactSchema(m: ContactMessages = defaultMessages) {
  return z
    .object({
      name: z.string().trim().min(2, m.name).max(100),
      type: z.enum(REQUEST_TYPE_VALUES, { message: m.type }),
      email: z
        .string()
        .trim()
        .max(160)
        .refine((v) => v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), m.email),
      phone: z
        .string()
        .trim()
        .max(30)
        .refine((v) => v === '' || /^[+\d][\d\s()-]{5,}$/.test(v), m.phone),
      country: z.string().trim().max(100),
      company: z.string().trim().max(120),
      message: z.string().trim().max(2000, m.message),
      website: z.string().max(0).optional(), // honeypot: real people never fill it
    })
    .refine((d) => d.email !== '' || d.phone !== '', { message: m.contactRequired, path: ['email'] });
}

export const contactSchema = createContactSchema();
export type ContactInput = z.infer<typeof contactSchema>;
