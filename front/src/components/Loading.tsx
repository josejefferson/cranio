import styles from '../styles/Loading.module.css'

export default function Loading({ loading }: any) {
  return (
    <div className={`${styles.loadingScreen} ${loading ? styles.visible : ''}`}>
      <div className={styles.loadingScreenText}>Aguarde</div>
      <div className={styles.loadingScreenIcon}>
        <img src="/img/timer-sand.svg" alt="" />
      </div>
    </div>
  )
}