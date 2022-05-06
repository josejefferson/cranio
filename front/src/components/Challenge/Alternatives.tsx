import styles from '../../styles/Alternatives.module.css'
import Image from 'next/image'

export default function Alternatives({ image, alternatives, selected }: any) {
	return (
		<div className={styles.body}>
			<div className={styles.image} hidden={!image}>
				<img src={image} alt="" hidden={!image} />
			</div>
			<div className={styles.alternatives}>
				{alternatives.map((alternative: any, i: number) => {
					return (
						<div className={`${styles.alternative} ${selected.includes(i + 1) ? styles.selected : ''}`} key={alternative._id}>
							<div className={styles.alternativeNumber}>{i + 1}</div>
							<div className={styles.alternativeBody}>{alternative.title}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}