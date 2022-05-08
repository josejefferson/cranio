import styles from '@/styles/Question.module.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import chroma from 'chroma-js'

export default function Timer({ time, currentTime }: any) {
  const color = chroma.scale(['#ff595e', '#ffca3a', '#8ac926']).mode('hsl')(currentTime / time)

  return (
    <>
      <CircularProgressbar
        className={styles.test}
        styles={buildStyles({
          trailColor: 'transparent',
          pathColor: color.toString()
        })}
        value={currentTime}
        maxValue={time}
      />
      <div
        className={`${styles.timerText} ${currentTime <= 5 ? styles.timeEnding : ''}`}
      >
        {currentTime}
      </div>
    </>
  )
}