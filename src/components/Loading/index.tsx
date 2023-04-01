import styles from '@/styles/Loading.module.css'

export default function Loading({ loading, text, icon }: any) {
  return (
    <div className={`${styles.loadingScreen} ${loading ? styles.visible : ''}`}>
      <div className={styles.loadingScreenText}>{text || 'Aguarde'}</div>
      <div className={styles.loadingScreenIcon}>
        {icon || (
          <img className={styles.loadingScreenIconImg} src="/img/rings.svg" alt="Carregando" />
        )}
      </div>
    </div>
  )
}
