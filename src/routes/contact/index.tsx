import React, { useCallback, useState } from 'react'
import './index.scss'

const EMAIL = 'reinaldoams@gmail.com'

// GitHub mark: Octicons mark-github-16 (MIT, github.com/primer/octicons)
const GITHUB_MARK_16_PATH =
  'M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z'

function IconGithub() {
  return (
      <svg
        x="8"
        y="11"
        width="51"
        height="45"
        viewBox="0 0 16 16"
        preserveAspectRatio="xMidYMid meet"
      >
        <path fill="#000" d={GITHUB_MARK_16_PATH} />
      </svg>
  )
}

function IconLinkedin() {
  return (
    <svg
      className="contact-icon-item__svg"
      viewBox="0 0 32 32"
      aria-hidden
      focusable="false"
    >
      <rect x="5" y="5" width="22" height="22" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      <text
        x="16"
        y="19"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#000"
        fontFamily="Tahoma, MS Sans Serif, sans-serif"
        fontSize="22"
        fontWeight="700"
      >
        in
      </text>
    </svg>
  )
}

function IconMail() {
  return (
    <svg
      className="contact-icon-item__svg"
      viewBox="0 0 32 32"
      aria-hidden
      focusable="false"
    >
      <rect x="3" y="9" width="26" height="16" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      <path fill="none" stroke="#000" strokeWidth="1" d="M3 9 L16 19 L29 9" />
    </svg>
  )
}

type CopyToast = { id: number; x: number; y: number }

function ContactPage() {
  const [copyToast, setCopyToast] = useState<CopyToast | null>(null)

  const copyEmail = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const { clientX, clientY } = e
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopyToast({ id: Date.now(), x: clientX, y: clientY })
      window.setTimeout(() => setCopyToast(null), 1000)
    } catch {
      try {
        const ta = document.createElement('textarea')
        ta.value = EMAIL
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        setCopyToast({ id: Date.now(), x: clientX, y: clientY })
        window.setTimeout(() => setCopyToast(null), 1000)
      } catch {
        window.prompt('Copy email:', EMAIL)
      }
    }
  }, [])

  return (
    <div className="contact-page">
      <h2>Contact and Links</h2>
      <div className="contact-icons">
        <a
          className="contact-icon-item"
          href="https://github.com/reinaldoams"
          target="_blank"
          rel="noreferrer"
        >
          <span className="contact-icon-item__graphic">
            <IconGithub />
          </span>
          <span className="contact-icon-item__label">
            GitHub
          </span>
        </a>
        <a
          className="contact-icon-item"
          href="https://www.linkedin.com/in/reinaldoams/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="contact-icon-item__graphic">
            <IconLinkedin />
          </span>
          <span className="contact-icon-item__label">
            LinkedIn
          </span>
        </a>
        <button type="button" className="contact-icon-item" onClick={copyEmail} aria-label="Copy email address">
          <span className="contact-icon-item__graphic">
            <IconMail />
          </span>
          <span className="contact-icon-item__label">
            E-mail
          </span>
        </button>
      </div>
      {copyToast ? (
        <span
          key={copyToast.id}
          className="contact-copy-toast"
          style={{ left: copyToast.x, top: copyToast.y }}
          role="status"
        >
          Copied
        </span>
      ) : null}
    </div>
  )
}

export default ContactPage
