'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { KONAMI_SEQUENCE } from '@/hooks/useKonami'
import { cn } from '@/lib/utils'

const KEY_LABELS: Record<string, string> = {
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→',
  b: 'B',
  a: 'A',
}

interface EasterEggHintProps {
  progress: string[]
  addKey: (key: string) => void
  wrongKey: boolean
  total: number
}

function DPadButton({
  keyName,
  lastPressed,
  onPress,
  className,
}: {
  keyName: string
  lastPressed: string | null
  onPress: (key: string) => void
  className?: string
}) {
  const isActive = lastPressed === keyName
  return (
    <button
      onClick={() => onPress(keyName)}
      className={cn(
        'flex h-14 w-14 items-center justify-center rounded-xl border-2 text-xl font-bold transition-all duration-150 active:scale-95',
        isActive
          ? 'scale-95 border-brand bg-brand/10 text-brand'
          : 'border-border bg-background text-foreground',
        className
      )}
    >
      {KEY_LABELS[keyName]}
    </button>
  )
}

function ActionButton({
  keyName,
  lastPressed,
  onPress,
}: {
  keyName: string
  lastPressed: string | null
  onPress: (key: string) => void
}) {
  const isActive = lastPressed === keyName
  return (
    <button
      onClick={() => onPress(keyName)}
      className={cn(
        'flex h-14 w-14 items-center justify-center rounded-full border-2 text-sm font-bold uppercase transition-all duration-150 active:scale-95',
        isActive
          ? 'scale-95 border-brand bg-brand text-white'
          : 'border-border bg-background text-foreground'
      )}
    >
      {keyName.toUpperCase()}
    </button>
  )
}

function DesktopKeyDisplay({ progress, wrongKey }: { progress: string[]; wrongKey: boolean }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
      {KONAMI_SEQUENCE.map((key, i) => {
        const filled = progress.length > i
        const isNext = progress.length === i
        const style = {
          background: filled ? 'rgba(99,102,241,0.12)' : 'var(--background)',
          borderColor: filled
            ? 'var(--brand)'
            : wrongKey && isNext
            ? '#ef4444'
            : 'var(--border)',
          color: filled ? 'var(--brand)' : 'var(--foreground-secondary)',
        }
        return (
          <motion.div
            key={i}
            animate={{ scale: filled ? 1.15 : 1 }}
            transition={{ duration: 0.15 }}
            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 font-mono text-sm font-bold transition-colors"
            style={style}
          >
            {KEY_LABELS[key]}
          </motion.div>
        )
      })}
    </div>
  )
}

function MobileSequenceDisplay({ progress, wrongKey }: { progress: string[]; wrongKey: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      {KONAMI_SEQUENCE.map((key, i) => {
        const filled = progress.length > i
        const style = {
          borderColor: filled ? 'var(--brand)' : wrongKey ? '#ef4444' : 'var(--border)',
          background: filled ? 'rgba(99,102,241,0.15)' : 'var(--background)',
          color: filled ? 'var(--brand)' : 'var(--foreground-secondary)',
        }
        return (
          <div
            key={i}
            className="flex h-8 w-8 items-center justify-center rounded-lg border font-mono text-xs font-bold transition-all duration-150"
            style={style}
          >
            {KEY_LABELS[key]}
          </div>
        )
      })}
    </div>
  )
}

function ProgressDots({ progress, wrongKey, total }: { progress: string[]; wrongKey: boolean; total: number }) {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: progress.length === i + 1 ? 1.4 : 1,
            backgroundColor:
              progress.length > i
                ? 'var(--brand)'
                : wrongKey
                ? '#ef4444'
                : 'var(--border)',
          }}
          transition={{ duration: 0.15 }}
          className="h-2 w-2 rounded-full"
        />
      ))}
    </div>
  )
}

export default function EasterEggHint({ progress, addKey, wrongKey, total }: EasterEggHintProps) {
  const t = useTranslations('easterEgg')
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [lastPressed, setLastPressed] = useState<string | null>(null)

  function handleButtonPress(key: string) {
    setLastPressed(key)
    setTimeout(() => setLastPressed(null), 200)
    addKey(key)
  }

  return (
    <section
      className="border-y border-border py-16"
      style={{ background: 'var(--card)' }}
    >
      <div className="mx-auto max-w-2xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 block text-3xl">🎮</span>
          <h2 className="mb-2 text-xl font-semibold text-foreground">{t('hint_heading')}</h2>
          <p className="mb-8 text-sm text-foreground-secondary">
            {isDesktop ? t('hint_desktop') : t('hint_mobile')}
          </p>
        </motion.div>

        {isDesktop && <DesktopKeyDisplay progress={progress} wrongKey={wrongKey} />}

        {!isDesktop && (
          <div className="space-y-8">
            <div className="flex flex-col items-center gap-1">
              <DPadButton keyName="ArrowUp" lastPressed={lastPressed} onPress={handleButtonPress} />
              <div className="flex gap-1">
                <DPadButton keyName="ArrowLeft" lastPressed={lastPressed} onPress={handleButtonPress} />
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-border/30 bg-card">
                  <div className="h-3 w-3 rounded-full bg-border/50" />
                </div>
                <DPadButton keyName="ArrowRight" lastPressed={lastPressed} onPress={handleButtonPress} />
              </div>
              <DPadButton keyName="ArrowDown" lastPressed={lastPressed} onPress={handleButtonPress} />
            </div>

            <div className="flex justify-center gap-4">
              <ActionButton keyName="b" lastPressed={lastPressed} onPress={handleButtonPress} />
              <ActionButton keyName="a" lastPressed={lastPressed} onPress={handleButtonPress} />
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-wider text-foreground-secondary">
                {t('sequence_label')}
              </p>
              <MobileSequenceDisplay progress={progress} wrongKey={wrongKey} />
            </div>
          </div>
        )}

        <div className="mt-8">
          <ProgressDots progress={progress} wrongKey={wrongKey} total={total} />
        </div>

        <p className="mt-4 text-xs text-foreground-secondary">
          {wrongKey ? (
            <span className="text-red-400">{t('wrong')}</span>
          ) : progress.length === 0 ? (
            t('start')
          ) : (
            t('progress', { current: progress.length, total })
          )}
        </p>
      </div>
    </section>
  )
}
