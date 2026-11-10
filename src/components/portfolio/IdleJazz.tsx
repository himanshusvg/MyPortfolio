"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const IDLE_DELAY = 20_000
const JAZZ_TRACK = "/audio/relaxing-jazz-night.mp3"

export default function IdleJazz() {
  const [remainingSeconds, setRemainingSeconds] = useState(20)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const lastActivity = useRef(Date.now())
  const audio = useRef<HTMLAudioElement | null>(null)
  const hasUnlockedAudio = useRef(false)

  const getAudio = useCallback(() => {
    if (!audio.current) {
      const track = new Audio(JAZZ_TRACK)
      track.loop = true
      track.preload = "auto"
      track.volume = 0.22
      audio.current = track
    }
    return audio.current
  }, [])

  const startJazz = useCallback(() => {
    if (isPlaying || isDismissed) return
    const track = getAudio()
    track.volume = 0.22
    void track
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => undefined)
  }, [getAudio, isDismissed, isPlaying])

  const stopJazz = useCallback(() => {
    const track = audio.current
    if (track) {
      track.pause()
      track.currentTime = 0
    }
    setIsPlaying(false)
    setIsDismissed(true)
  }, [])

  useEffect(() => {
    if (isDismissed || isPlaying) return

    const registerActivity = () => {
      lastActivity.current = Date.now()
      setRemainingSeconds(20)
    }
    const unlockAudio = () => {
      const track = getAudio()
      if (!hasUnlockedAudio.current) {
        const intendedVolume = track.volume
        track.volume = 0
        void track
          .play()
          .then(() => {
            track.pause()
            track.currentTime = 0
            track.volume = intendedVolume
            hasUnlockedAudio.current = true
          })
          .catch(() => {
            track.volume = intendedVolume
          })
      }
      registerActivity()
    }
    const updateCountdown = () => {
      const remaining = Math.max(
        0,
        Math.ceil(
          (IDLE_DELAY - (Date.now() - lastActivity.current)) / 1000,
        ),
      )
      setRemainingSeconds(remaining)
      if (remaining === 0) startJazz()
    }

    window.addEventListener("pointermove", registerActivity, {
      passive: true,
    })
    window.addEventListener("scroll", registerActivity, { passive: true })
    window.addEventListener("pointerdown", unlockAudio, { passive: true })
    window.addEventListener("touchstart", unlockAudio, { passive: true })
    window.addEventListener("keydown", unlockAudio)
    const countdownTimer = window.setInterval(updateCountdown, 250)

    return () => {
      window.removeEventListener("pointermove", registerActivity)
      window.removeEventListener("scroll", registerActivity)
      window.removeEventListener("pointerdown", unlockAudio)
      window.removeEventListener("touchstart", unlockAudio)
      window.removeEventListener("keydown", unlockAudio)
      window.clearInterval(countdownTimer)
    }
  }, [getAudio, isDismissed, isPlaying, startJazz])

  useEffect(
    () => () => {
      audio.current?.pause()
      audio.current = null
    },
    [],
  )

  if (isDismissed) return null

  return (
    <>
      {!isPlaying && remainingSeconds <= 10 && (
        <div className="jazz-countdown" role="status" aria-live="polite">
          Jazz will Play in {remainingSeconds}
        </div>
      )}
      {isPlaying && (
        <button
          className="button button-secondary jazz-stop-button"
          type="button"
          onClick={stopJazz}
        >
          Stop Jazz
        </button>
      )}
    </>
  )
}
