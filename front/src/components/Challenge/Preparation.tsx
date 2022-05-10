import styles from '@/styles/Preparation.module.css'
import { Header } from '@/components/index'
import Timer from '@/components/Challenge/Timer'
import { useState } from 'react'

export default function Preparation({ topic, time, preparationTime, preparationMessage, callback }: any) {
  preparationTime = preparationTime || 3
  preparationMessage = preparationMessage || 'O desafio já vai começar!'
  const [active, setActive] = useState(true)
  const timeOutCallback = () => {
    setActive(false)
    callback()
  }

  return (
    <div className={`${styles.container} ${!active ? styles.hidden : ''}`}>
      <Header />
      <div className={styles.body}>
        <div className={styles.title}>Prepare-se!</div>
        <div className={styles.message}>{preparationMessage}</div>

        <div className={styles.columns}>
          <div className={styles.column}>
            <div className={styles.topic}>Disciplina</div>
            <div className={styles.topicName}>{topic || '-'}</div>
          </div>
          <div className={styles.column}>
            <div className={styles.time}>Tempo</div>
            <div className={styles.timeValue}>{time || '-'} segundos</div>
          </div>
        </div>
        <div className={styles.timer}>
          <Timer {...({ time: preparationTime, active, timeOutCallback })} />
        </div>
      </div>
    </div>
  )
}