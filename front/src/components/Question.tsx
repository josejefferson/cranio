import styles from '../styles/Question.module.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useState, useEffect } from 'react'

export default function Question() {
	const [timer, setTimer] = useState(100)

	useEffect(() => {
		setInterval(() => {
			setTimer(timer - 1)
		}, 1000)
	})

	return (
		<div className={styles.questionContainer}>
			<div className={styles.details}>
				<div className={styles.topic}>Matemática</div>
				<div className={styles.question}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, commodi, delectus labore dicta eos, culpa vitae accusamus quibusdam.</div>
				<div className={styles.createdBy}>Por: Fulano de tal</div>
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