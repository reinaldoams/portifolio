import { useCallback, useEffect, useRef } from 'react'
import './PacketBreakerGame.scss'

const W = 720
const H = 560
const PADDLE_W = 128
const PADDLE_H = 20
const BALL_R = 10
const BRICK_ROWS = 4
const BRICK_COLS = 9
const BRICK_GAP = 6
const BRICK_TOP = 72
const PADDLE_Y = H - 56

type Mutable = {
  paddleX: number
  ballX: number
  ballY: number
  ballVx: number
  ballVy: number
  launched: boolean
  bricks: boolean[][]
  score: number
  lives: number
  over: 'play' | 'won' | 'lost'
  keys: { left: boolean; right: boolean }
}

function initBricks(): boolean[][] {
  return Array.from({ length: BRICK_ROWS }, () => Array.from({ length: BRICK_COLS }, () => true))
}

function resetBallOnPaddle(m: Mutable) {
  m.ballX = m.paddleX + PADDLE_W / 2
  m.ballY = PADDLE_Y - BALL_R - 1
  m.ballVx = 0
  m.ballVy = 0
  m.launched = false
}

function createState(): Mutable {
  const paddleX = (W - PADDLE_W) / 2
  const m: Mutable = {
    paddleX,
    ballX: paddleX + PADDLE_W / 2,
    ballY: PADDLE_Y - BALL_R - 1,
    ballVx: 0,
    ballVy: 0,
    launched: false,
    bricks: initBricks(),
    score: 0,
    lives: 3,
    over: 'play',
    keys: { left: false, right: false },
  }
  return m
}

function brickRect(col: number, row: number) {
  const margin = 16
  const brickH = 28
  const usable = W - margin * 2 - (BRICK_COLS - 1) * BRICK_GAP
  const bw = usable / BRICK_COLS
  const x = margin + col * (bw + BRICK_GAP)
  const y = BRICK_TOP + row * (brickH + BRICK_GAP)
  return { x, y, w: bw, h: brickH }
}

/** One filled heart; (cx, cy) is the visual center; `size` is layout width for spacing. */
function drawLifeHeart(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  // Narrower than `size`, slightly taller — reads as a classic heart, not a wide badge.
  const hw = size * 0.34
  const tipY = cy + size * 0.3
  const topY = cy - size * 0.36
  ctx.beginPath()
  ctx.moveTo(cx, tipY)
  ctx.bezierCurveTo(cx - hw * 0.25, cy + size * 0.14, cx - hw, cy + size * 0.02, cx - hw, cy - size * 0.18)
  ctx.bezierCurveTo(cx - hw, cy - size * 0.38, cx - hw * 0.22, topY, cx, cy - size * 0.1)
  ctx.bezierCurveTo(cx + hw * 0.22, topY, cx + hw, cy - size * 0.38, cx + hw, cy - size * 0.18)
  ctx.bezierCurveTo(cx + hw, cy + size * 0.02, cx + hw * 0.25, cy + size * 0.14, cx, tipY)
  ctx.closePath()
  ctx.fillStyle = '#e94560'
  ctx.fill()
  ctx.strokeStyle = '#5c1524'
  ctx.lineWidth = 1.5
  ctx.stroke()
}

function draw(ctx: CanvasRenderingContext2D, m: Mutable) {
  ctx.fillStyle = '#1a1a2e'
  ctx.fillRect(0, 0, W, H)

  const palette = ['#e94560', '#f9d423', '#00adb5', '#c73659']
  for (let r = 0; r < BRICK_ROWS; r++) {
    for (let c = 0; c < BRICK_COLS; c++) {
      if (!m.bricks[r][c]) continue
      const { x, y, w, h } = brickRect(c, r)
      ctx.fillStyle = palette[r % palette.length]
      ctx.fillRect(x, y, w, h)
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 1
      ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1)
    }
  }

  ctx.fillStyle = '#c0c0c0'
  ctx.fillRect(m.paddleX, PADDLE_Y, PADDLE_W, PADDLE_H)
  ctx.strokeStyle = '#fff'
  ctx.strokeRect(m.paddleX + 0.5, PADDLE_Y + 0.5, PADDLE_W - 1, PADDLE_H - 1)
  ctx.strokeStyle = '#404040'
  ctx.strokeRect(m.paddleX + 1.5, PADDLE_Y + 1.5, PADDLE_W - 3, PADDLE_H - 3)

  ctx.beginPath()
  ctx.arc(m.ballX, m.ballY, BALL_R, 0, Math.PI * 2)
  ctx.fillStyle = '#ffff88'
  ctx.fill()
  ctx.strokeStyle = '#886600'
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.fillStyle = '#8892b0'
  ctx.font = '22px sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText(`Packets cleared: ${m.score}`, 16, 32)

  const heartSize = 28
  const heartGap = 8
  const heartCy = 22
  for (let i = 0; i < m.lives; i++) {
    const cx = W - 16 - heartSize / 2 - i * (heartSize + heartGap)
    drawLifeHeart(ctx, cx, heartCy, heartSize)
  }

  if (m.over === 'won') {
    ctx.fillStyle = 'rgba(0,0,0,0.65)'
    ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = '#7fff7f'
    ctx.font = 'bold 32px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('YOU WON', W / 2, H / 2 - 16)
    ctx.fillStyle = '#fff'
    ctx.font = '22px sans-serif'
    ctx.fillText('Press R to play again', W / 2, H / 2 + 28)
  } else if (m.over === 'lost') {
    ctx.fillStyle = 'rgba(0,0,0,0.65)'
    ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = '#ff6b6b'
    ctx.font = 'bold 32px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('YOU LOST', W / 2, H / 2 - 16)
    ctx.fillStyle = '#fff'
    ctx.font = '22px sans-serif'
    ctx.fillText('Press R to play again', W / 2, H / 2 + 28)
  }
}

function tick(m: Mutable) {
  if (m.over !== 'play') return

  const speed = 10.4
  if (m.keys.left) m.paddleX = Math.max(8, m.paddleX - speed)
  if (m.keys.right) m.paddleX = Math.min(W - PADDLE_W - 8, m.paddleX + speed)

  if (!m.launched) {
    m.ballX = m.paddleX + PADDLE_W / 2
    m.ballY = PADDLE_Y - BALL_R - 1
    return
  }

  m.ballX += m.ballVx
  m.ballY += m.ballVy

  if (m.ballX < BALL_R) {
    m.ballX = BALL_R
    m.ballVx = Math.abs(m.ballVx)
  } else if (m.ballX > W - BALL_R) {
    m.ballX = W - BALL_R
    m.ballVx = -Math.abs(m.ballVx)
  }
  if (m.ballY < BALL_R) {
    m.ballY = BALL_R
    m.ballVy = Math.abs(m.ballVy)
  }

  if (
    m.ballVy > 0 &&
    m.ballY + BALL_R >= PADDLE_Y &&
    m.ballY + BALL_R <= PADDLE_Y + PADDLE_H + 8 &&
    m.ballX >= m.paddleX - BALL_R &&
    m.ballX <= m.paddleX + PADDLE_W + BALL_R
  ) {
    m.ballY = PADDLE_Y - BALL_R
    const hit = (m.ballX - (m.paddleX + PADDLE_W / 2)) / (PADDLE_W / 2)
    m.ballVy = -Math.abs(m.ballVy)
    m.ballVx += hit * 4.4
    m.ballVx = Math.max(-12, Math.min(12, m.ballVx))
  }

  brick: for (let r = 0; r < BRICK_ROWS; r++) {
    for (let c = 0; c < BRICK_COLS; c++) {
      if (!m.bricks[r][c]) continue
      const { x, y, w, h } = brickRect(c, r)
      const overlapX = Math.min(m.ballX + BALL_R, x + w) - Math.max(m.ballX - BALL_R, x)
      const overlapY = Math.min(m.ballY + BALL_R, y + h) - Math.max(m.ballY - BALL_R, y)
      if (overlapX <= 0 || overlapY <= 0) continue
      m.bricks[r][c] = false
      m.score += 1
      if (overlapX < overlapY) {
        // Side collision — push ball out horizontally
        m.ballVx *= -1
        m.ballX = m.ballX < x + w / 2 ? x - BALL_R : x + w + BALL_R
      } else {
        // Top/bottom collision — push ball out vertically
        m.ballVy *= -1
        m.ballY = m.ballY < y + h / 2 ? y - BALL_R : y + h + BALL_R
      }
      break brick
    }
  }

  if (m.ballY > H + 24) {
    m.lives -= 1
    if (m.lives <= 0) {
      m.over = 'lost'
    } else {
      resetBallOnPaddle(m)
    }
  }

  if (m.bricks.every((row) => row.every((b) => !b))) {
    m.over = 'won'
  }
}

export default function PacketBreakerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mRef = useRef<Mutable>(createState())
  const rafRef = useRef<number>(0)

  const restart = useCallback(() => {
    mRef.current = createState()
  }, [])

  const tryServe = useCallback(() => {
    const m = mRef.current
    if (m.over !== 'play') return
    if (!m.launched) {
      m.launched = true
      m.ballVx = (Math.random() - 0.5) * 6
      m.ballVy = -8.4
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const m = mRef.current
      if (e.code === 'ArrowLeft') {
        m.keys.left = e.type === 'keydown'
        e.preventDefault()
      }
      if (e.code === 'ArrowRight') {
        m.keys.right = e.type === 'keydown'
        e.preventDefault()
      }
      if (e.type === 'keydown' && e.code === 'Space') {
        e.preventDefault()
        tryServe()
      }
      if (e.type === 'keydown' && e.key.toLowerCase() === 'r') {
        restart()
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keyup', onKey)
    }
  }, [restart, tryServe])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const loop = () => {
      tick(mRef.current)
      draw(ctx, mRef.current)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="packet-breaker">
      <p className="packet-breaker__blurb">
        Bounce the ping through the protocol stack. <kbd>←</kbd> <kbd>→</kbd> move the paddle.{' '}
        <kbd>Space</kbd> serves. <kbd>R</kbd> restarts.
      </p>
      <canvas ref={canvasRef} className="packet-breaker__canvas" width={W} height={H} aria-label="Packet breaker game" />
      <div className="packet-breaker__touch-controls">
        <button
          type="button"
          className="packet-breaker__touch-btn"
          aria-label="Move paddle left"
          onPointerDown={(e) => {
            e.preventDefault()
            mRef.current.keys.left = true
            e.currentTarget.setPointerCapture(e.pointerId)
          }}
          onPointerUp={() => {
            mRef.current.keys.left = false
          }}
          onPointerCancel={() => {
            mRef.current.keys.left = false
          }}
          onLostPointerCapture={() => {
            mRef.current.keys.left = false
          }}
        >
          ←
        </button>
        <button
          type="button"
          className="packet-breaker__touch-btn packet-breaker__touch-btn--serve"
          aria-label="Serve ball"
          onPointerDown={(e) => {
            e.preventDefault()
            tryServe()
          }}
        >
          Serve
        </button>
        <button
          type="button"
          className="packet-breaker__touch-btn"
          aria-label="Move paddle right"
          onPointerDown={(e) => {
            e.preventDefault()
            mRef.current.keys.right = true
            e.currentTarget.setPointerCapture(e.pointerId)
          }}
          onPointerUp={() => {
            mRef.current.keys.right = false
          }}
          onPointerCancel={() => {
            mRef.current.keys.right = false
          }}
          onLostPointerCapture={() => {
            mRef.current.keys.right = false
          }}
        >
          →
        </button>
      </div>
      <button type="button" className="packet-breaker__restart" onClick={restart}>
        Restart (R)
      </button>
    </div>
  )
}
