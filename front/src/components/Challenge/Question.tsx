import styles from '../../styles/Question.module.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useState, useEffect } from 'react'
import { Data } from '@/interface/index'
import { Text } from '@chakra-ui/react'
interface Ianswer extends Data{
	answer: any;
}

export default function Question({ time, topic, question, createdBy, currentTime }: Ianswer) {
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
					value={currentTime}
					maxValue={time}
					text={`${currentTime}`}
				/>
			</div>
		</div>
	)
}