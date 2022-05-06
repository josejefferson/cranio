import styles from '../../styles/Question.module.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useState, useEffect } from 'react'
type Iapi = {

}
export default function Question({ topic }: any) {
	const [timer, setTimer] = useState(100)
console.log(topic)
	useEffect(() => {
		const time = setInterval(() => {
			setTimer(timer - 1)
		}, 1000)
		return () => clearTimeout(time)
	})

	return (
		<div className={styles.questionContainer}>
			<div className={styles.details}>
				<div className={styles.topic}>{topic}</div>
				<div className={styles.question}>{}</div>
				<div className={styles.createdBy}>Por: {}</div>
			</div>
			<div className={styles.timer}>
				<CircularProgressbar
					className={styles.test}
					styles={buildStyles({
						trailColor: 'transparent',
						pathColor: 'var(--color-arc)',
						textColor: 'white',
						textSize: '2vh'
					})}
					value={timer}
					text={`${timer}`}
				/>
			</div>
		</div>
	)
}