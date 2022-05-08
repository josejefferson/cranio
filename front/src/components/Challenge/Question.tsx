import styles from '@/styles/Question.module.css'
import 'react-circular-progressbar/dist/styles.css'
import { Data } from '@/interface/index'
import { Text } from '@chakra-ui/react'
import Timer from '@/components/Challenge/Timer'
interface Ianswer extends Data{
	currentTime: any;
}

export default function Question({ time, topic, question, createdBy, currentTime }: Ianswer) {
	return (
		<div className={styles.questionContainer}>
			<div className={styles.details}>
				<div className={styles.topic}>{topic}</div>
				<div className={styles.question}>{question}</div>
				<div className={styles.createdBy}>
					<Text fontSize={'1vh'}>Por: {createdBy.map((e: any) => e.name).join(', ')}</Text>
				</div>
			</div>
			<div className={styles.timer}>
				<Timer time={time} currentTime={currentTime} />
			</div>
		</div>
	)
}
