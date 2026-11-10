"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react"

export type GamePhase = "idle" | "playing" | "finished"

type BallPhysics = {
  x: number
  y: number
  width: number
  height: number
  vx: number
  vy: number
}

export function useHeroBreakout() {
  const heroRef = useRef<HTMLElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const gameBallRef = useRef<HTMLDivElement>(null)
  const portraitFrame = useRef<number | null>(null)
  const gameFrame = useRef<number | null>(null)
  const resultTimer = useRef<number | null>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const activityStarted = useRef<number | null>(null)
  const lastMovement = useRef(0)
  const phaseRef = useRef<GamePhase>("idle")
  const ball = useRef<BallPhysics | null>(null)
  const originalPosition = useRef({ x: 0, y: 0 })
  const hasLeftStart = useRef(false)
  const scoreRef = useRef(0)
  const [gamePhase, setGamePhase] = useState<GamePhase>("idle")
  const [gameScore, setGameScore] = useState(0)
  const [finalScore, setFinalScore] = useState(0)
  const [didWinGame, setDidWinGame] = useState(false)
  const [ballSize, setBallSize] = useState({ width: 74, height: 37 })

  const closeGameResult = useCallback(() => {
    if (resultTimer.current !== null) window.clearTimeout(resultTimer.current)
    resultTimer.current = null
    phaseRef.current = "idle"
    activityStarted.current = null
    lastMovement.current = 0
    setGamePhase("idle")
  }, [])

  const finishGame = useCallback(() => {
    if (phaseRef.current !== "playing") return
    phaseRef.current = "finished"
    document.body.classList.remove("breakout-game-active")
    if (gameFrame.current !== null) cancelAnimationFrame(gameFrame.current)
    gameFrame.current = null
    setFinalScore(scoreRef.current)
    setGamePhase("finished")
    resultTimer.current = window.setTimeout(closeGameResult, 5_000)
  }, [closeGameResult])

  useEffect(() => {
    if (gamePhase !== "playing") return
    let previousTime = performance.now()
    const activeCollisions = new Set<string>()

    const animate = (time: number) => {
      const physics = ball.current
      const ballElement = gameBallRef.current
      const hero = heroRef.current
      const paddle = portraitRef.current
      if (!physics || !ballElement || !hero || !paddle) {
        finishGame()
        return
      }

      const delta = Math.min((time - previousTime) / 1000, 0.035)
      previousTime = time
      physics.vy += 105 * delta
      physics.x += physics.vx * delta
      physics.y += physics.vy * delta

      const heroBounds = hero.getBoundingClientRect()
      if (physics.x <= heroBounds.left) {
        physics.x = heroBounds.left
        physics.vx = Math.abs(physics.vx)
      } else if (physics.x + physics.width >= heroBounds.right) {
        physics.x = heroBounds.right - physics.width
        physics.vx = -Math.abs(physics.vx)
      }
      if (physics.y <= 0) {
        physics.y = 0
        physics.vy = Math.abs(physics.vy)
      }

      const startDistance = Math.hypot(
        physics.x - originalPosition.current.x,
        physics.y - originalPosition.current.y,
      )
      if (startDistance > 140) hasLeftStart.current = true
      if (hasLeftStart.current && startDistance <= 5) {
        scoreRef.current = 10_000
        setGameScore(10_000)
        setDidWinGame(true)
        finishGame()
        return
      }

      const paddleBounds = paddle.getBoundingClientRect()
      const hitsPaddle =
        physics.vy > 0 &&
        physics.x + physics.width > paddleBounds.left &&
        physics.x < paddleBounds.right &&
        physics.y + physics.height > paddleBounds.top &&
        physics.y < paddleBounds.bottom
      if (hitsPaddle) {
        const hit =
          (physics.x +
            physics.width / 2 -
            (paddleBounds.left + paddleBounds.width / 2)) /
          (paddleBounds.width / 2)
        physics.y = paddleBounds.top - physics.height - 1
        physics.vy = -Math.max(220, Math.abs(physics.vy) * 1.02)
        physics.vx = Math.max(
          -340,
          Math.min(340, physics.vx + hit * 145),
        )
      }

      document
        .querySelectorAll<HTMLElement>("[data-game-obstacle]")
        .forEach((obstacle) => {
          const bounds = obstacle.getBoundingClientRect()
          const key = obstacle.dataset.gameObstacle || "obstacle"
          const intersects =
            physics.x + physics.width > bounds.left &&
            physics.x < bounds.right &&
            physics.y + physics.height > bounds.top &&
            physics.y < bounds.bottom
          if (!intersects) {
            activeCollisions.delete(key)
            return
          }
          if (!activeCollisions.has(key)) {
            activeCollisions.add(key)
            scoreRef.current += 5
            setGameScore(scoreRef.current)
          }
          const overlaps = [
            physics.x + physics.width - bounds.left,
            bounds.right - physics.x,
            physics.y + physics.height - bounds.top,
            bounds.bottom - physics.y,
          ]
          const smallest = Math.min(...overlaps)
          if (smallest === overlaps[0] || smallest === overlaps[1]) {
            physics.vx =
              smallest === overlaps[0]
                ? -Math.abs(physics.vx)
                : Math.abs(physics.vx)
          } else {
            physics.vy =
              smallest === overlaps[2]
                ? -Math.abs(physics.vy)
                : Math.abs(physics.vy)
          }
        })

      if (physics.y > heroBounds.bottom) {
        finishGame()
        return
      }
      ballElement.style.transform = `translate3d(${physics.x}px, ${physics.y}px, 0)`
      gameFrame.current = requestAnimationFrame(animate)
    }

    gameFrame.current = requestAnimationFrame(animate)
    return () => {
      if (gameFrame.current !== null) cancelAnimationFrame(gameFrame.current)
      gameFrame.current = null
    }
  }, [finishGame, gamePhase])

  const startGame = useCallback(() => {
    if (phaseRef.current !== "idle") return
    const source = document.querySelector<HTMLElement>(
      "[data-game-ball-source='projects']",
    )
    if (!source) return
    const bounds = source.getBoundingClientRect()
    ball.current = {
      x: bounds.left,
      y: bounds.top,
      width: bounds.width,
      height: bounds.height,
      vx: Math.random() > 0.5 ? 165 : -165,
      vy: 70,
    }
    originalPosition.current = { x: bounds.left, y: bounds.top }
    hasLeftStart.current = false
    setDidWinGame(false)
    setBallSize({ width: bounds.width, height: bounds.height })
    scoreRef.current = 0
    setGameScore(0)
    phaseRef.current = "playing"
    document.body.classList.add("breakout-game-active")
    setGamePhase("playing")
  }, [])

  useEffect(() => {
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.075
      current.current.y += (target.current.y - current.current.y) * 0.075
      if (portraitRef.current) {
        portraitRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) rotateX(${-current.current.y * 0.012}deg) rotateY(${current.current.x * 0.012}deg)`
      }
      portraitFrame.current = requestAnimationFrame(tick)
    }
    portraitFrame.current = requestAnimationFrame(tick)
    return () => {
      document.body.classList.remove("breakout-game-active")
      if (portraitFrame.current !== null) cancelAnimationFrame(portraitFrame.current)
      if (gameFrame.current !== null) cancelAnimationFrame(gameFrame.current)
      if (resultTimer.current !== null) window.clearTimeout(resultTimer.current)
    }
  }, [])

  const movePortrait = (event: PointerEvent<HTMLElement>) => {
    const origin = portraitRef.current?.parentElement?.getBoundingClientRect()
    if (!origin) return
    target.current = {
      x: event.clientX - (origin.left + origin.width / 2),
      y: event.clientY - (origin.top + origin.height / 2),
    }
    if (phaseRef.current !== "idle") return
    const now = performance.now()
    if (
      activityStarted.current === null ||
      now - lastMovement.current > 1_200
    ) {
      activityStarted.current = now
    }
    lastMovement.current = now
    if (now - activityStarted.current >= 5_000) startGame()
  }

  const resetPortrait = () => {
    target.current = { x: 0, y: 0 }
    activityStarted.current = null
    lastMovement.current = 0
    if (phaseRef.current === "playing") finishGame()
  }

  return {
    heroRef,
    portraitRef,
    gameBallRef,
    gamePhase,
    gameScore,
    finalScore,
    didWinGame,
    ballSize,
    movePortrait,
    resetPortrait,
    closeGameResult,
  }
}
