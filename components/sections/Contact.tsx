'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { contactSchema, type ContactFormData } from '@/features/contact/schema'
import { cn } from '@/lib/utils'

type FormStatus = 'idle' | 'success' | 'error'

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-base leading-relaxed text-[var(--foreground-secondary)]">
        Open to new opportunities, collaborations, and interesting projects.
        Drop me a message and I will get back to you shortly.
      </p>
      <div className="flex flex-col gap-4">
        <a
          href="mailto:paulus.m.mateusz@gmail.com"
          className="flex items-center gap-3 text-sm text-[var(--foreground-secondary)] transition-colors hover:text-[var(--brand)]"
        >
          <Mail size={18} className="shrink-0" />
          paulus.m.mateusz@gmail.com
        </a>
        <a
          href="https://github.com/mateuszpaulus"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-sm text-[var(--foreground-secondary)] transition-colors hover:text-[var(--brand)]"
        >
          <GithubIcon />
          github.com/mateuszpaulus
        </a>
        <a
          href="https://linkedin.com/in/mateusz-paulus"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-sm text-[var(--foreground-secondary)] transition-colors hover:text-[var(--brand)]"
        >
          <LinkedinIcon />
          linkedin.com/in/mateusz-paulus
        </a>
      </div>
    </div>
  )
}

function SuccessState({ onReset, t }: { onReset: () => void; t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-green-500/20 bg-green-500/5 p-8 text-center">
      <CheckCircle size={40} className="text-green-500" />
      <div>
        <p className="font-semibold text-foreground">{t('success_title')}</p>
        <p className="mt-1 text-sm text-[var(--foreground-secondary)]">{t('success_message')}</p>
      </div>
      <button
        onClick={onReset}
        className="text-sm text-[var(--brand)] underline-offset-4 hover:underline"
      >
        Send another message
      </button>
    </div>
  )
}

function ErrorState({ onReset, t }: { onReset: () => void; t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-red-500/20 bg-red-500/5 p-8 text-center">
      <AlertCircle size={40} className="text-red-500" />
      <div>
        <p className="font-semibold text-foreground">{t('error_title')}</p>
        <p className="mt-1 text-sm text-[var(--foreground-secondary)]">{t('error_message')}</p>
      </div>
      <button
        onClick={onReset}
        className="text-sm text-[var(--brand)] underline-offset-4 hover:underline"
      >
        {t('send')}
      </button>
    </div>
  )
}

function ContactForm({ t }: { t: ReturnType<typeof useTranslations> }) {
  const [status, setStatus] = useState<FormStatus>('idle')

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { honeypot: '' },
  })

  const messageValue = watch('message') ?? ''

  const onSubmit = async (data: ContactFormData) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (response.ok) setStatus('success')
    else setStatus('error')
  }

  const handleReset = () => {
    reset()
    setStatus('idle')
  }

  if (status === 'success') return <SuccessState onReset={handleReset} t={t} />
  if (status === 'error') return <ErrorState onReset={handleReset} t={t} />

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
        <input tabIndex={-1} {...register('honeypot')} autoComplete="off" />
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          {t('name')}
        </label>
        <input
          id="name"
          type="text"
          placeholder="Jan Kowalski"
          {...register('name')}
          className={cn(
            'rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground outline-none',
            'placeholder:text-foreground/30 focus:ring-2 focus:ring-[var(--brand)]/40',
            errors.name ? 'border-red-500' : 'border-border'
          )}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          {t('email')}
        </label>
        <input
          id="email"
          type="email"
          placeholder="jan@example.com"
          {...register('email')}
          className={cn(
            'rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground outline-none',
            'placeholder:text-foreground/30 focus:ring-2 focus:ring-[var(--brand)]/40',
            errors.email ? 'border-red-500' : 'border-border'
          )}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          {t('message')}
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Hello, I would like to talk about..."
          {...register('message')}
          className={cn(
            'resize-none rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground outline-none',
            'placeholder:text-foreground/30 focus:ring-2 focus:ring-[var(--brand)]/40',
            errors.message ? 'border-red-500' : 'border-border'
          )}
        />
        <div className="flex items-start justify-between gap-2">
          {errors.message ? (
            <p className="text-xs text-red-500">{errors.message.message}</p>
          ) : (
            <span />
          )}
          <p className="shrink-0 text-xs text-[var(--foreground-secondary)]">
            {messageValue.length}/1000
          </p>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-hover)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && <Loader2 size={16} className="animate-spin" />}
        {isSubmitting ? t('sending') : t('send')}
      </button>
    </form>
  )
}

export default function Contact() {
  const t = useTranslations('contact')

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading title={t('heading')} subtitle={t('subtitle')} />
        <div className="grid gap-16 lg:grid-cols-2">
          <ContactInfo />
          <ContactForm t={t} />
        </div>
      </div>
    </section>
  )
}
