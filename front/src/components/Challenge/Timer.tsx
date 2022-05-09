import styles from '@/styles/Question.module.css'
import 'react-circular-progressbar/dist/styles.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useState, useEffect } from 'react'
import chroma from 'chroma-js'

export default function Timer({ time, active, timeOutCallback }: any) {
  const [timeChange, setTimeChange] = useState(false)

  // Timer
  const [timer, setTimer] = useState(time)
  useEffect(() => {
    if (active && timer > 0) {
      const _timer = setTimeout(() => {
        setTimer(timer - 1)
        setTimeChange(true)
        setTimeout(() => setTimeChange(false), 200)
      }, 1000)
      return () => clearTimeout(_timer)
    } else if (active && timer === 0) {
      timeOutCallback(null)
    }
  })

  const color = chroma.scale(['#ff595e', '#ffca3a', '#8ac926']).mode('hsl')(timer / time)

  return (
    <>
      <CircularProgressbar
        className={styles.test}
        styles={buildStyles({
          trailColor: 'transparent',
          pathColor: color.toString()
        })}
        value={timer}
        maxValue={time}
      />
      <div
        className={`${styles.timerText} ${timer <= 5 ? styles.timeEnding : ''} ${timeChange ? styles.scale : ''}`}
      >
        {timer}
      </div>
    </>
  )
}