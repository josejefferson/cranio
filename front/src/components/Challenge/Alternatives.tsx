import styles from '@/styles/Alternatives.module.css'
import { IprosAlternatives } from '@/interface/index'

export default function Alternatives({ image, alternatives, preparationTime, active, selected, handleClick }: IprosAlternatives) {
	return (
		<div className={`${styles.body} ${!active ? styles.end : ''}`}>
			<div className={styles.image} hidden={!image}>
				<img src={image} alt="" hidden={!image} />
			</div>
			<div className={styles.alternatives}>
				{alternatives.map((alternative, i: number) => {
					return (
						<div
							className={`${styles.alternative} ${selected.includes(i + 1) ? styles.selected : ''}`}
							onClick={() => handleClick(i)}
							style={{ animationDelay: `${preparationTime * 100 + i * 100}ms, ${preparationTime * 100 + 1000 + i * 100}ms` }}
							key={alternative._id}
						>
							<div className={styles.alternativeNumber}>{i + 1}</div>
							<div className={styles.alternativeBody}>{alternative.title}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
