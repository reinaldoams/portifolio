import {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { useLocation } from 'react-router-dom'

function readUiScale(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--ui-scale').trim()
  const n = parseFloat(raw)
  return Number.isFinite(n) && n > 0 ? n : 1.5
}

function isCoarsePointer(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(pointer: coarse)').matches
}

type Metrics = {
  scrollable: boolean
  thumbHeightPx: number
  thumbTopPx: number
}

export function Win95ScrollBox({ children }: { children: ReactNode }) {
  const location = useLocation()
  const contentRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollRafRef = useRef<number | null>(null)

  const [metrics, setMetrics] = useState<Metrics>({
    scrollable: false,
    thumbHeightPx: 0,
    thumbTopPx: 0,
  })
  const [thumbDragging, setThumbDragging] = useState(false)

  const readMetrics = useCallback(() => {
    const content = contentRef.current
    const track = trackRef.current
    if (!content || !track) {
      setMetrics({ scrollable: false, thumbHeightPx: 0, thumbTopPx: 0 })
      return
    }
    const { scrollTop, scrollHeight, clientHeight } = content
    const maxScroll = scrollHeight - clientHeight
    if (maxScroll <= 1) {
      setMetrics({ scrollable: false, thumbHeightPx: 0, thumbTopPx: 0 })
      return
    }
    const trackH = track.clientHeight
    if (trackH <= 1) {
      setMetrics({ scrollable: true, thumbHeightPx: 0, thumbTopPx: 0 })
      return
    }
    const scale = readUiScale()
    const minThumb = (isCoarsePointer() ? 40 : 20) * scale
    const thumbH = Math.max(minThumb, (clientHeight / scrollHeight) * trackH)
    const travel = Math.max(1, trackH - thumbH)
    const thumbTop = (scrollTop / maxScroll) * travel
    setMetrics((prev) => {
      const next: Metrics = {
        scrollable: true,
        thumbHeightPx: thumbH,
        thumbTopPx: thumbTop,
      }
      if (
        prev.scrollable === next.scrollable &&
        Math.abs(prev.thumbHeightPx - next.thumbHeightPx) < 0.5 &&
        Math.abs(prev.thumbTopPx - next.thumbTopPx) < 0.5
      ) {
        return prev
      }
      return next
    })
  }, [])

  const scheduleReadMetrics = useCallback(() => {
    if (scrollRafRef.current != null) return
    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = null
      readMetrics()
    })
  }, [readMetrics])

  useLayoutEffect(() => {
    readMetrics()
  }, [location.pathname, readMetrics])

  useLayoutEffect(() => {
    const content = contentRef.current
    const track = trackRef.current
    if (!content || !track) return

    readMetrics()
    const ro = new ResizeObserver(readMetrics)
    ro.observe(content)
    ro.observe(track)
    content.addEventListener('scroll', scheduleReadMetrics, { passive: true })
    window.addEventListener('resize', readMetrics)
    return () => {
      ro.disconnect()
      content.removeEventListener('scroll', scheduleReadMetrics)
      window.removeEventListener('resize', readMetrics)
      if (scrollRafRef.current != null) {
        cancelAnimationFrame(scrollRafRef.current)
        scrollRafRef.current = null
      }
    }
  }, [readMetrics, scheduleReadMetrics])

  const scrollByPixels = useCallback(
    (delta: number) => {
      const el = contentRef.current
      if (!el) return
      el.scrollTop += delta
      readMetrics()
    },
    [readMetrics],
  )

  const lineStep = useCallback(() => 40 * readUiScale(), [])

  const onTrackPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return
      if (e.target !== e.currentTarget) return
      const content = contentRef.current
      const track = trackRef.current
      if (!content || !track || !metrics.scrollable) return
      const rect = track.getBoundingClientRect()
      const y = e.clientY - rect.top
      const { scrollTop, scrollHeight, clientHeight } = content
      const maxScroll = scrollHeight - clientHeight
      const trackH = track.clientHeight
      const scale = readUiScale()
      const minThumb = (isCoarsePointer() ? 40 : 20) * scale
      const thumbH = Math.max(minThumb, (clientHeight / scrollHeight) * trackH)
      const thumbTop = (scrollTop / maxScroll) * (trackH - thumbH)
      if (y < thumbTop) {
        content.scrollTop = Math.max(0, scrollTop - clientHeight)
      } else if (y > thumbTop + thumbH) {
        content.scrollTop = Math.min(maxScroll, scrollTop + clientHeight)
      }
      readMetrics()
    },
    [readMetrics, metrics.scrollable],
  )

  const onThumbPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return
      e.preventDefault()
      e.stopPropagation()
      const content = contentRef.current
      const track = trackRef.current
      const thumbEl = e.currentTarget
      if (!content || !track) return

      const pointerId = e.pointerId
      try {
        thumbEl.setPointerCapture(pointerId)
      } catch {
        /* ignore */
      }
      setThumbDragging(true)

      const startY = e.clientY
      const startScroll = content.scrollTop
      const maxScroll = content.scrollHeight - content.clientHeight
      const trackH = track.clientHeight
      const scale = readUiScale()
      const minThumb = (isCoarsePointer() ? 40 : 20) * scale
      const thumbH = Math.max(minThumb, (content.clientHeight / content.scrollHeight) * trackH)
      const travel = Math.max(1, trackH - thumbH)

      const onMove = (ev: PointerEvent) => {
        if (ev.cancelable) ev.preventDefault()
        const dy = ev.clientY - startY
        const next = startScroll + (dy / travel) * maxScroll
        content.scrollTop = Math.max(0, Math.min(maxScroll, next))
      }
      const onUp = () => {
        setThumbDragging(false)
        try {
          thumbEl.releasePointerCapture(pointerId)
        } catch {
          /* ignore */
        }
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('pointercancel', onUp)
        readMetrics()
      }
      window.addEventListener('pointermove', onMove, { passive: false })
      window.addEventListener('pointerup', onUp)
      window.addEventListener('pointercancel', onUp)
    },
    [readMetrics],
  )

  return (
    <div className="routes">
      <div className="routes__viewport">
        <div className="routes__content" ref={contentRef}>
          {children}
        </div>
      </div>
      <div className="routes__scrollbar" aria-hidden>
        <button
          type="button"
          className="routes__scrollbar-btn routes__scrollbar-btn--up"
          onClick={() => scrollByPixels(metrics.scrollable ? -lineStep() : 0)}
          disabled={!metrics.scrollable}
          tabIndex={-1}
        />
        <div
          className="routes__scrollbar-track"
          ref={trackRef}
          onPointerDown={onTrackPointerDown}
        >
          {metrics.scrollable ? (
            <div
              className={`routes__scrollbar-thumb${thumbDragging ? ' routes__scrollbar-thumb--dragging' : ''}`}
              style={{
                height: metrics.thumbHeightPx,
                transform: `translateY(${metrics.thumbTopPx}px)`,
              }}
              onPointerDown={onThumbPointerDown}
            />
          ) : null}
        </div>
        <button
          type="button"
          className="routes__scrollbar-btn routes__scrollbar-btn--down"
          onClick={() => scrollByPixels(metrics.scrollable ? lineStep() : 0)}
          disabled={!metrics.scrollable}
          tabIndex={-1}
        />
      </div>
    </div>
  )
}
