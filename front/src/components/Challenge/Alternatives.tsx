import styles from '../../styles/Alternatives.module.css'

export default function Alternatives() {
	return (
		<div className={styles.body}>
			<div className={styles.image}>
				<img src="https://www.metabase.com/images/posts/the-right-visualization/stacked-bar-chart.png" alt="Chart" />
			</div>
			<div className={styles.alternatives}>
				<div className={styles.alternative}>
					<div className={styles.alternativeNumber}>1</div>
					<div className={styles.alternativeBody}>Lorem ipsum dolor sit amet.</div>
				</div>
				<div className={styles.alternative}>
					<div className={styles.alternativeNumber}>2</div>
					<div className={styles.alternativeBody}>Lorem ipsum dolor sit amet.</div>
				</div>
				<div className={styles.alternative}>
					<div className={styles.alternativeNumber}>3</div>
					<div className={styles.alternativeBody}>Lorem ipsum dolor sit amet.</div>
				</div>
				<div className={styles.alternative}>
					<div className={styles.alternativeNumber}>4</div>
					<div className={styles.alternativeBody}>Lorem ipsum dolor sit amet.</div>
				</div>
			</div>
		</div>
	)
}