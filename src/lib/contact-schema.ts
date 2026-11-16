import { z } from 'zod';

// Shared by the form (client) and the API route (server): one source of truth.
export const REQUEST_TYPE_VALUES = ['purchasing', 'supply', 'import', 'export', 'partnership', 'other'] as const;
export type RequestType = (typeof REQUEST_TYPE_VALUES)[number];

export const REQUEST_TYPE_LABELS: Record<RequestType, string> = {
  purchasing: 'Product Purchasing',
  supply: 'Product Supply',
  import: 'Import',
  export: 'Export',
  partnership: 'Business Partnership',
  other: 'Other Inquiries',
};

export const contactSchema = z
  .object({
    name: z.string().trim().min(2, 'Please enter your full name.').max(100),
    type: z.enum(REQUEST_TYPE_VALUES, { message: 'Please choose a request type.' }),
    email: z
      .string()
      .trim()
      .max(160)
      .refine((v) => v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Please enter a valid email address.'),
    phone: z
      .string()
      .trim()
      .max(30)
      .refine((v) => v === '' || /^[+\d][\d\s()-]{5,}$/.test(v), 'Please enter a valid phone number.'),
    country: z.string().trim().max(100),
    company: z.string().trim().max(120),
    message: z.string().trim().max(2000, 'Please keep the details under 2000 characters.'),
    website: z.string().max(0).optional(), // honeypot: real people never fill it
  })
  .refine((d) => d.email !== '' || d.phone !== '', {
    message: 'Please give an email or a phone number so we can reply.',
    path: ['email'],
  });

export type ContactInput = z.infer<typeof contactSchema>;
