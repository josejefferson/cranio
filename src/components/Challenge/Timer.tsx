import styles from '@/styles/Timer.module.css'
import 'react-circular-progressbar/dist/styles.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useState, useEffect } from 'react'
import chroma from 'chroma-js'
import useTimer from '@/hooks/useTimer'

export default function Timer({ time, active, timeOutCallback }: any) {
  const [timeChange, setTimeChange] = useState(false)
  const { timer } = useTimer(time, active, setTimeChange, timeOutCallback)

  const color = chroma.scale(['#ff595e', '#ffca3a', '#8ac926']).mode('hsl')(timer / time)

  return (
    <div className={styles.timer}>
      <CircularProgressbar
        styles={buildStyles({
          trailColor: 'transparent',
          pathColor: color.toString()
        })}
        value={timer}
        maxValue={time}
      />
      <div
        className={`${styles.timerText} ${timer <= 5 ? styles.timeEnding : ''} ${
          timeChange ? styles.scale : ''
        }`}
      >
        {timer}
      </div>
    </div>
  )
}
