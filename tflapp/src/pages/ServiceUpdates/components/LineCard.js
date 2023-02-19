import React from "react"
import { useState } from "react"

import styles from "./LineCard.module.scss"

function LineCard({line, status, description}) {

  const [viewReason, setViewReason] = useState(false)
  
  return (
    <>
    <div className={styles.LineCard}>
      <h3>{line}</h3>
      <p>{status}</p>
      { description && <button onClick={(() => setViewReason(!viewReason))}>View details</button>}
      { viewReason && <span>{description}</span>}
    </div>
    </>
  )
}

export default LineCard