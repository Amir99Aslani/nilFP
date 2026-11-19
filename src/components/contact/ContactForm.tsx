'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import { createContactSchema, REQUEST_TYPE_VALUES, type ContactInput } from '@/lib/contact-schema';
import type { Content } from '@/content';
import c from './Contact.module.scss';

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={c.field}>
      <label htmlFor={id} className={c.label}>
        {label}
        {required && ' *'}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className={c.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm({ copy: f, defaults }: { copy: Content['contact']['form']; defaults?: Partial<ContactInput> }) {
  const schema = useMemo(() => createContactSchema(f.errors), [f.errors]);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: { name: '', type: '' as ContactInput['type'], email: '', phone: '', country: '', company: '', message: '', website: '', ...defaults },
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus('idle');
    setServerError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        reset();
        setStatus('success');
      } else {
        setServerError(data.error ?? f.error);
        setStatus('error');
      }
    } catch {
      setServerError(f.error);
      setStatus('error');
    }
  };

  const aria = (name: keyof ContactInput) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form className={c.panel} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={c.row}>
        <Field id="name" label={f.fields.name.label} required error={errors.name?.message}>
          <input id="name" className={c.input} placeholder={f.fields.name.placeholder} autoComplete="name" {...register('name')} {...aria('name')} />
        </Field>
        <Field id="type" label={f.fields.type.label} required error={errors.type?.message}>
          <div className={c.selectWrap}>
            <select id="type" className={c.input} {...register('type')} {...aria('type')}>
              <option value="" disabled>
                {f.fields.type.placeholder}
              </option>
              {REQUEST_TYPE_VALUES.map((v) => (
                <option key={v} value={v}>
                  {f.types[v]}
                </option>
              ))}
            </select>
            <FaChevronDown className={c.chevron} size={14} aria-hidden="true" />
          </div>
        </Field>
      </div>

      <div className={c.row}>
        <Field id="email" label={f.fields.email.label} error={errors.email?.message}>
          <input id="email" type="email" className={c.input} placeholder={f.fields.email.placeholder} autoComplete="email" dir="auto" {...register('email')} {...aria('email')} />
        </Field>
        <Field id="phone" label={f.fields.phone.label} error={errors.phone?.message}>
          <input id="phone" type="tel" className={c.input} placeholder={f.fields.phone.placeholder} autoComplete="tel" dir="auto" {...register('phone')} {...aria('phone')} />
        </Field>
      </div>

      <div className={c.row}>
        <Field id="country" label={f.fields.country.label} error={errors.country?.message}>
          <input id="country" className={c.input} placeholder={f.fields.country.placeholder} autoComplete="country-name" {...register('country')} {...aria('country')} />
        </Field>
        <Field id="company" label={f.fields.company.label} error={errors.company?.message}>
          <input id="company" className={c.input} placeholder={f.fields.company.placeholder} autoComplete="organization" {...register('company')} {...aria('company')} />
        </Field>
      </div>

      <Field id="message" label={f.fields.message.label} error={errors.message?.message}>
        <textarea id="message" className={`${c.input} ${c.textarea}`} placeholder={f.fields.message.placeholder} {...register('message')} {...aria('message')} />
      </Field>

      {/* Honeypot: hidden from people, bots fill it in */}
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className={c.hp} {...register('website')} />

      <button type="submit" className={c.submit} disabled={isSubmitting}>
        {isSubmitting ? f.sending : f.submit}
      </button>

      <div aria-live="polite">
        {status === 'success' && <p className={c.statusOk}>{f.success}</p>}
        {status === 'error' && <p className={c.error}>{serverError}</p>}
      </div>
    </form>
  );
}
