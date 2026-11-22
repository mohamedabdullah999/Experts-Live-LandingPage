'use client';

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import type { Content, FormKind, Option } from '@/content/types';
import { applicationSchema, LIMITS, toFieldErrors, type ErrorCode } from '@/lib/applications';
import { Button } from './Button';
import styles from './ApplicationForm.module.css';

type Status = 'idle' | 'submitting' | 'success' | 'error';
type FormError = 'network' | 'rateLimited' | 'server' | 'summary';

const MAX_BY_FIELD: Record<string, number> = {
  fullName: LIMITS.name,
  email: LIMITS.email,
  phone: LIMITS.phone,
  startupName: LIMITS.org,
  organisation: LIMITS.org,
  role: LIMITS.org,
  website: LIMITS.url,
  pitch: LIMITS.pitch,
};

export function ApplicationForm({ c }: { c: Pick<Content, 'locale' | 'form'> }) {
  const f = c.form;
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const [kind, setKind] = useState<FormKind>('startup');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, ErrorCode>>({});
  const [formError, setFormError] = useState<FormError | null>(null);
  const [sentTo, setSentTo] = useState('');

  // Any link with data-form="startup|investor" (hero, persona tabs) preselects the matching form.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-form]');
      const value = link?.dataset.form;
      if (value === 'startup' || value === 'investor') {
        setKind(value);
        setStatus('idle');
        setErrors({});
        setFormError(null);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const message = (field: string, code: ErrorCode) =>
    code === 'tooLong' ? f.errors.tooLong.replace('{max}', String(MAX_BY_FIELD[field] ?? 200)) : f.errors[code];

  const focusFirstError = (fieldErrors: Record<string, ErrorCode>) => {
    const first = Object.keys(fieldErrors)[0];
    const el = first ? formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`) : null;
    (el ?? summaryRef.current)?.focus();
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;

    const data = new FormData(e.currentTarget);
    const payload = {
      kind,
      locale: c.locale,
      fullName: String(data.get('fullName') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      consent: data.get('consent') === 'on',
      company_url: String(data.get('company_url') ?? ''),
      ...(kind === 'startup'
        ? {
            startupName: String(data.get('startupName') ?? ''),
            website: String(data.get('website') ?? ''),
            sector: String(data.get('sector') ?? ''),
            stage: String(data.get('stage') ?? ''),
            pitch: String(data.get('pitch') ?? ''),
          }
        : {
            organisation: String(data.get('organisation') ?? ''),
            role: String(data.get('role') ?? ''),
            investorType: String(data.get('investorType') ?? ''),
          }),
    };

    const parsed = applicationSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors = toFieldErrors(parsed.error);
      setErrors(fieldErrors);
      setFormError('summary');
      setStatus('error');
      requestAnimationFrame(() => focusFirstError(fieldErrors));
      return;
    }

    setErrors({});
    setFormError(null);
    setStatus('submitting');

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSentTo(parsed.data.email);
        setStatus('success');
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { fields?: Record<string, ErrorCode> };
      if (res.status === 422 && body.fields) {
        setErrors(body.fields);
        setFormError('summary');
        requestAnimationFrame(() => focusFirstError(body.fields ?? {}));
      } else {
        setFormError(res.status === 429 ? 'rateLimited' : 'server');
        requestAnimationFrame(() => summaryRef.current?.focus());
      }
      setStatus('error');
    } catch {
      setFormError('network');
      setStatus('error');
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  const reset = () => {
    formRef.current?.reset();
    setStatus('idle');
    setErrors({});
    setFormError(null);
  };

  const kindCopy = f.kinds[kind];

  /* ---------- field helpers ---------- */
  const errId = (name: string) => `${uid}-${name}-error`;
  const hintId = (name: string) => `${uid}-${name}-hint`;
  const describedBy = (name: string, hint?: boolean) =>
    [hint ? hintId(name) : null, errors[name] ? errId(name) : null].filter(Boolean).join(' ') || undefined;

  // Plain render helpers (not components) so inputs keep their values across re-renders.
  function errorText(name: string) {
    return errors[name] ? (
      <span id={errId(name)} className={styles.error}>
        {message(name, errors[name])}
      </span>
    ) : null;
  }

  function field(
    { name, label, optional, hint }: { name: string; label: string; optional?: boolean; hint?: string },
    children: ReactNode,
  ) {
    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${uid}-${name}`}>
          {label}
          {optional ? <span className={styles.optional}> ({f.optional})</span> : null}
        </label>
        {hint ? (
          <span id={hintId(name)} className={styles.hint}>
            {hint}
          </span>
        ) : null}
        {children}
        {errorText(name)}
      </div>
    );
  }

  const input = (name: string, type = 'text', opts: { ltr?: boolean; placeholder?: string; autoComplete?: string; required?: boolean; hint?: boolean } = {}) => (
    <input
      id={`${uid}-${name}`}
      name={name}
      type={type}
      className={`${styles.control} ${opts.ltr ? styles.ltr : ''}`}
      placeholder={opts.placeholder}
      autoComplete={opts.autoComplete}
      maxLength={MAX_BY_FIELD[name]}
      aria-required={opts.required ?? true}
      aria-invalid={errors[name] ? true : undefined}
      aria-describedby={describedBy(name, opts.hint)}
      dir={opts.ltr ? 'ltr' : undefined}
    />
  );

  const select = (name: string, options: Option[]) => (
    <select
      id={`${uid}-${name}`}
      name={name}
      className={styles.control}
      defaultValue=""
      aria-required
      aria-invalid={errors[name] ? true : undefined}
      aria-describedby={describedBy(name)}
    >
      <option value="" disabled>
        {f.selectPlaceholder}
      </option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );

  const checks = (name: string, legend: string, options: Option[], optional?: boolean) => (
    <fieldset className={styles.checks} aria-describedby={errors[name] ? errId(name) : undefined}>
      <legend className={styles.label}>
        {legend}
        {optional ? <span className={styles.optional}> ({f.optional})</span> : null}
      </legend>
      {options.map((o) => (
        <label key={o.value} className={styles.chip}>
          <input type="checkbox" name={name} value={o.value} />
          <span>{o.label}</span>
        </label>
      ))}
      <div style={{ flexBasis: '100%' }}>
        {errorText(name)}
      </div>
    </fieldset>
  );

  /* ---------- render ---------- */
  return (
    <div className={styles.panel}>
      <h3 className={styles.heading}>{f.heading}</h3>

      <fieldset className={styles.switch}>
        <legend>{f.switchLabel}</legend>
        {(['startup', 'investor'] as const).map((k) => (
          <label key={k} className={styles.switchOption}>
            <input
              type="radio"
              name={`${uid}-kind`}
              value={k}
              checked={kind === k}
              onChange={() => {
                setKind(k);
                setStatus('idle');
                setErrors({});
                setFormError(null);
              }}
            />
            <span>{f.kinds[k].tab}</span>
          </label>
        ))}
      </fieldset>

      {status === 'success' ? (
        <div className={styles.success} role="status">
          <span className={styles.successMark} aria-hidden="true">
            ✓
          </span>
          <h4 ref={successRef} tabIndex={-1} className={styles.successTitle}>
            {kindCopy.successTitle}
          </h4>
          <p className={styles.successBody}>
            {f.successBody.split('{email}')[0]}
            <bdi dir="ltr">{sentTo}</bdi>
            {f.successBody.split('{email}')[1]}
          </p>
          <Button type="button" variant="quiet" size="small" onClick={reset}>
            {f.sendAnother}
          </Button>
        </div>
      ) : (
        <>
          <p className={styles.kindIntro}>{kindCopy.intro}</p>
          <form
            ref={formRef}
            key={kind}
            className={styles.form}
            onSubmit={onSubmit}
            onChange={(e) => {
              // Clear a field's error as soon as the person edits it
              const name = (e.target as unknown as HTMLInputElement).name;
              if (errors[name]) {
                setErrors(({ [name]: _removed, ...rest }) => rest);
              }
            }}
            noValidate
          >
            {formError ? (
              <p ref={summaryRef} tabIndex={-1} className={styles.summary} role="alert">
                {f.errors[formError]}
              </p>
            ) : null}

            {field({ name: "fullName", label: f.fields.fullName.label }, input('fullName', 'text', { autoComplete: 'name' }))}

            <div className={styles.row}>
              {field({ name: "email", label: f.fields.email.label }, input('email', 'email', { ltr: true, autoComplete: 'email', placeholder: f.fields.email.placeholder }))}
              {field({ name: "phone", label: f.fields.phone.label }, input('phone', 'tel', { ltr: true, autoComplete: 'tel', placeholder: f.fields.phone.placeholder }))}
            </div>

            {kind === 'startup' ? (
              <>
                <div className={styles.row}>
                  {field({ name: "startupName", label: f.fields.startupName.label }, input('startupName', 'text', { autoComplete: 'organization' }))}
                  {field({ name: "website", label: f.fields.website.label, optional: true }, input('website', 'url', { ltr: true, autoComplete: 'url', placeholder: f.fields.website.placeholder, required: false }))}
                </div>
                <div className={styles.row}>
                  {field({ name: "sector", label: f.fields.sector.label }, select('sector', f.sectors))}
                  {field({ name: "stage", label: f.fields.stage.label }, select('stage', f.stages))}
                </div>
                {field({ name: "pitch", label: f.fields.pitch.label, hint: f.fields.pitch.hint }, <textarea
                    id={`${uid}-pitch`}
                    name="pitch"
                    rows={3}
                    maxLength={LIMITS.pitch}
                    className={styles.control}
                    aria-required
                    aria-invalid={errors.pitch ? true : undefined}
                    aria-describedby={describedBy('pitch', true)}
                  />)}
              </>
            ) : (
              <>
                <div className={styles.row}>
                  {field({ name: "organisation", label: f.fields.organisation.label }, input('organisation', 'text', { autoComplete: 'organization' }))}
                  {field({ name: "role", label: f.fields.role.label }, input('role', 'text', { autoComplete: 'organization-title' }))}
                </div>
                {field({ name: "investorType", label: f.fields.investorType.label }, select('investorType', f.investorTypes))}
              </>
            )}

            {/* Honeypot for bots; hidden from people and assistive tech */}
            <div className={styles.honeypot} aria-hidden="true">
              <label>
                Company URL
                <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className={styles.field}>
              <label className={styles.consent}>
                <input
                  type="checkbox"
                  name="consent"
                  aria-required
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? errId('consent') : undefined}
                />
                <span>{f.fields.consent.label}</span>
              </label>
              {errorText('consent')}
            </div>

            <div className={styles.footer}>
              <Button type="submit" block disabled={status === 'submitting'} aria-disabled={status === 'submitting'}>
                {status === 'submitting' ? f.sending : kindCopy.submit}
              </Button>
              <p className={styles.privacy}>{f.privacyNote}</p>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
