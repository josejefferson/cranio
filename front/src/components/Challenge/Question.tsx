import styles from '../../styles/Question.module.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useState, useEffect } from 'react'
import { Data } from '@/interface/index'
import { Text } from '@chakra-ui/react'
interface Ianswer extends Data{
	answer: any;
}
export default function Question({ time, topic, question, createdBy, answer }: Ianswer) {
	const [timer, setTimer] = useState(time)
	const [timeOut, setTimeOut] = useState(false)

	useEffect(() => {
		const _timer = setInterval(() => {
			if (timer === 0 && !timeOut) {
				setTimeOut(true)
				return answer()
			}
			if (timer === 0) return
			setTimer(timer - 1)
		}, 1000)
		return () => clearTimeout(_timer)
	})

	return (
		<div className={styles.questionContainer}>
			<div className={styles.details}>
				<div className={styles.topic}>{topic}</div>
				<div className={styles.question}>{question}</div>
				<div className={styles.createdBy}>
					<Text fontSize={'14px'}>Por: {createdBy.map((e: any) => e.name).join(', ')}</Text>
				</div>
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
					maxValue={time}
					text={`${timer}`}
				/>
			</div>
		</div>
	)
}