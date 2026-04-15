'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link } from '@/lib/i18n/navigation'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { LanguageSwitch } from '@/components/common/LanguageSwitch'

interface NavLink {
  href: string
  label: string
}

interface MobileMenuProps {
  links: NavLink[]
  onClose: () => void
}

function MobileMenu({ links, onClose }: MobileMenuProps) {
  return (
    <motion.div
      key="mobile-menu"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-x-0 top-14 z-40 border-b border-border/60 bg-background/95 backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto flex max-w-300 flex-col gap-1 px-4 py-4">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              onClick={onClose}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/8 hover:text-foreground"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export function Navbar() {
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)

  const navLinks: NavLink[] = [
    { href: '#projects', label: t('projects') },
    { href: '#contact', label: t('contact') },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex h-14 max-w-300 items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-foreground transition-colors hover:text-brand"
          >
            MP
          </Link>

          <ul className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="text-foreground/60 transition-colors hover:text-foreground">
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <ThemeToggle />
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md text-foreground/60 transition-colors hover:bg-foreground/8 hover:text-foreground md:hidden"
              onClick={() => setOpen(v => !v)}
              aria-label={open ? t('close_menu') : t('open_menu')}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && <MobileMenu links={navLinks} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
