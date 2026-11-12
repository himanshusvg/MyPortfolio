'use client'

import { useState } from 'react'

type MobileMenuProps = {
  active: 'projects' | 'experiments' | 'about' | 'resume'
}

const links = [
  { key: 'projects', label: 'Projects', href: '/' },
  { key: 'experiments', label: 'Experiments', href: '/experiments' },
  { key: 'about', label: 'About Me', href: '/about' },
  { key: 'resume', label: 'Resume', href: '/resume' },
] as const

export function MobileMenu({ active }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`mobile-menu ${isOpen ? 'is-open' : ''}`}>
      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span aria-hidden="true">
          <i />
          <i />
        </span>
      </button>
      <nav className="mobile-menu-panel" id="mobile-navigation" aria-label="Mobile navigation">
        {links.map((link) => (
          <a
            className={active === link.key ? 'active' : ''}
            href={link.href}
            aria-current={active === link.key ? 'page' : undefined}
            key={link.key}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
