import { useState, useEffect } from 'react'

/**
 *
 * @param time total timer duration in ticks (default = seconds)
 * @param active boolean indicating whether the timer is on
 * @param timeCallback function that will be executed every second and at the end of animation
 * @param endCallback function that will be executed at the end of the timer time
 * @param timerTick duration of each tick, default: 1 second
 * @param animationDuration animation duration that runs every tick
 * @returns current time and set current time
 */
export default function useTimer(
  time: number,
  active: boolean,
  timeCallback?: (animationStart: boolean) => void,
  endCallback?: () => void,
  timerTick: number = 1000,
  animationDuration: number | false = 200
) {
  const [timer, setTimer] = useState(time)

  useEffect(() => {
    if (active && timer === 0) {
      endCallback?.()
      return
    }

    if (active && timer > 0) {
      const _timer = setInterval(() => {
        setTimer(timer - 1)

        if (!animationDuration) return

        timeCallback?.(true)
        setTimeout(() => timeCallback?.(false), animationDuration)
      }, timerTick)

      return () => clearInterval(_timer)
    }
  }, [timer, active, animationDuration, timeCallback, endCallback, timerTick])

  return { timer, setTimer }
}
