import styles from '../../styles/Alternatives.module.css'
import Image from 'next/image'
import { Data } from '@/interface/index'
interface IprosAlternatives extends Data {
	selected: any
}
export default function Alternatives({ image, alternatives, selected }: IprosAlternatives) {
	return (
		<div className={styles.body}>
			<div className={styles.image} hidden={!image}>
				<img src={image} alt="" hidden={!image} />
			</div>
			<div className={styles.alternatives}>
				{alternatives.map((alternative, i: number) => {
					return (
						<div
							className={`${styles.alternative} 
							${String(selected).includes(String(i) + 1) ? styles.selected : ''}`}
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