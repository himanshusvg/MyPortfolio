'use client'

import { useEffect, useState } from 'react'

const kolkataTimeFormatter = new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
})

function getKolkataTime() {
  return kolkataTimeFormatter.format(new Date())
}

export function SiteFooter({ className = '' }: { className?: string }) {
  const [kolkataTime, setKolkataTime] = useState('IST')

  useEffect(() => {
    const updateTime = () => setKolkataTime(getKolkataTime())
    updateTime()
    const timer = window.setInterval(updateTime, 30_000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <footer className={`footer ${className}`.trim()}>
      <a className="logo footer-logo" href="/" aria-label="Himanshu home">
        himanshu.
      </a>
      <div className="footer-links">
        <div>
          <strong>Navigate</strong>
          <a href="/">Projects</a>
          <a href="/experiments">Experiments</a>
          <a href="/about">About Me</a>
          <a href="/resume">Resume</a>
        </div>
        <div>
          <strong>Connect</strong>
          <a href="https://x.com/uxhimanshu" target="_blank" rel="noreferrer">
            X (Twitter)
          </a>
          <a href="https://www.linkedin.com/in/himanshu-ux/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
        <div>
          <strong>Based in</strong>
          <span>Kolkata &nbsp; {kolkataTime}</span>
        </div>
      </div>
    </footer>
  )
}
