import styles from "./loadingspinner.module.scss"

function LoadingSpinner() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  )
}

export default LoadingSpinner