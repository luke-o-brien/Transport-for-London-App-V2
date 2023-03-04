import React from "react"
import { useState } from "react"

import styles from "./LineCard.module.scss"

function LineCard({line, status, description, id, statusSeverity, mode}) {

  const [viewReason, setViewReason] = useState(false)
  
  return (
    <>
    <div className={styles.LineCard} style={ mode !== "bus" ? {borderLeft: `solid 15px var(--${id})`} :{borderLeft: `solid 15px var(--bus)`} }>
      <div className={styles.cardContent}>
        <div>
          <h3 className={styles.lineName}>{line}</h3>
          <p>{status}</p>
        </div>
        { description && <div className={styles.detailsContainer}><p className={styles.viewDetails} onClick={(() => setViewReason(!viewReason))}>View Details</p></div>}
      </div>
      { viewReason && <p className={styles.descriptions}>{description}</p>}
    </div>
    </>
  )
}

export default LineCard