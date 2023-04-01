import styles from '@/styles/Question.module.css'
import { Ianswer } from '@/interface/index'
import { Text } from '@chakra-ui/react'
import Timer from '@/components/Challenge/Timer'

export default function Question({
	time,
	topic,
	question,
	createdBy,
	preparationTime,
	active,
	timeOutCallback
}: Ianswer) {
	return (
		<div
			className={styles.questionContainer}
			style={{ animationDelay: `${preparationTime + 1}s` }}
		>
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
			<div className={styles.rippleBackground}>
				<div className={`${styles.circle} ${styles.xxlarge} ${styles.shade1}`}></div>
				<div className={`${styles.circle} ${styles.xlarge} ${styles.shade2}`}></div>
				<div className={`${styles.circle} ${styles.large} ${styles.shade3}`}></div>
				<div className={`${styles.circle} ${styles.medium} ${styles.shade4}`}></div>
			</div>
		</div>
	)
}
