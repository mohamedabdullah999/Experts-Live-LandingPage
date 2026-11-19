import { z } from 'zod';

/**
 * Validation shared by the form (client) and the API route (server).
 * Error messages are codes; the UI maps them to localised copy.
 */
export const SECTORS = ['ai', 'cloud', 'fintech', 'healthtech', 'digital-services', 'other'] as const;
export const STAGES = ['idea', 'prototype', 'early-revenue', 'growth'] as const;
export const INTERESTS = ['demo-day', 'startup-pod'] as const;
export const INVESTOR_TYPES = ['vc', 'angel', 'cvc', 'accelerator', 'other'] as const;

export const LIMITS = { name: 120, email: 200, phone: 30, org: 160, url: 300, pitch: 280 } as const;

export type ErrorCode = 'required' | 'email' | 'phone' | 'url' | 'tooLong' | 'consent' | 'chooseOne';

const text = (max: number) =>
  z
    .string({ error: 'required' })
    .trim()
    .min(1, { error: 'required' })
    .max(max, { error: 'tooLong' });

const phone = z
  .string({ error: 'required' })
  .trim()
  .min(1, { error: 'required' })
  .max(LIMITS.phone, { error: 'tooLong' })
  .refine((v) => /^\+?[\d\s()-]+$/.test(v) && (v.match(/\d/g)?.length ?? 0) >= 8 && (v.match(/\d/g)?.length ?? 0) <= 15, {
    error: 'phone',
  });

const email = z
  .string({ error: 'required' })
  .trim()
  .min(1, { error: 'required' })
  .max(LIMITS.email, { error: 'tooLong' })
  .pipe(z.email({ error: 'email' }));

const website = z
  .string()
  .trim()
  .max(LIMITS.url, { error: 'tooLong' })
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine((v) => v === undefined || /^https?:\/\/[^\s.]+\.[^\s]+$/i.test(v), { error: 'url' });

const consent = z.literal(true, { error: 'consent' });

const common = {
  locale: z.enum(['en', 'ar']),
  fullName: text(LIMITS.name),
  email,
  phone,
  consent,
  // Honeypot: real people never fill this hidden field
  company_url: z.string().max(500).optional(),
};

export const startupSchema = z.object({
  kind: z.literal('startup'),
  ...common,
  startupName: text(LIMITS.org),
  website,
  sector: z.enum(SECTORS, { error: 'required' }),
  stage: z.enum(STAGES, { error: 'required' }),
  pitch: text(LIMITS.pitch),
  interests: z.array(z.enum(INTERESTS)).min(1, { error: 'chooseOne' }),
});

export const investorSchema = z.object({
  kind: z.literal('investor'),
  ...common,
  organisation: text(LIMITS.org),
  role: text(LIMITS.org),
  investorType: z.enum(INVESTOR_TYPES, { error: 'required' }),
  focusSectors: z.array(z.enum(SECTORS)).default([]),
});

export const applicationSchema = z.discriminatedUnion('kind', [startupSchema, investorSchema]);

export type ApplicationInput = z.input<typeof applicationSchema>;
export type Application = z.output<typeof applicationSchema>;

/** Flattens zod issues to { fieldName: ErrorCode }. */
export function toFieldErrors(error: z.ZodError): Record<string, ErrorCode> {
  const out: Record<string, ErrorCode> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form');
    if (out[key]) continue;
    const code = issue.message as ErrorCode;
    out[key] = (['required', 'email', 'phone', 'url', 'tooLong', 'consent', 'chooseOne'] as const).includes(code)
      ? code
      : 'required';
  }
  return out;
}
