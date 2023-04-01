import styles from '@/styles/SplashScreen.module.css'

export default function SplashScreen() {
  return (
    <div className={styles.splashScreenContainer}>
      <div className={styles.splashScreen}>
        <img className={styles.image} src="/img/skull.svg" alt="Crânio" />
        <div className={styles.title}>O CRÂNIO</div>
      </div>
    </div>
  )
}