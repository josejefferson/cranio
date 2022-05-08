import styles from '@/styles/Question.module.css'
import { Data } from '@/interface/index'
import { Text } from '@chakra-ui/react'
import Timer from '@/components/Challenge/Timer'
interface Ianswer extends Data {
	active?: boolean
	timeOutCallback?: Function
}

export default function Question({
	time,
	topic,
	question,
	createdBy,
	active,
	timeOutCallback
}: Ianswer) {
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
				<Timer {...({ time, active, timeOutCallback })} />
			</div>
		</div>
	)
}
