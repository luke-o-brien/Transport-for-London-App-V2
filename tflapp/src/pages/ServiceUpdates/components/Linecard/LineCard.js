import React from "react"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

import styles from "./LineCard.module.scss"

function LineCard({line, status, description, id, statusSeverity, mode}) {
console.log(description)



  //const [statuses, setstatuses] = useState()
  const [viewReason, setViewReason] = useState(false)

  
  return (
    <>
    <div className={styles.LineCard} style={ mode !== "bus" ? {borderLeft: `solid 15px var(--${id})`} :{borderLeft: `solid 15px var(--bus)`} }>
      <div className={styles.cardContent}>
        <div>
          <h3 className={styles.lineName}>{line}</h3>
          <div className={styles.statuscontainer}>
            { status.length < 2 ? <p>{status[0].statusSeverityDescription}</p> : <><p>{status[0].statusSeverityDescription}</p><span className={styles.moreStatuses}>{` + ${status.length - 1} more`}</span></>}
          </div>
        </div>
        { description[0].statusSeverity !== 10  && <div className={statusSeverity < 7 ? styles.viewDetails : statusSeverity === 9 ? styles.viewDetailsMinor : ''} onClick={(() => setViewReason(!viewReason))}><p>Details <FontAwesomeIcon icon={faTriangleExclamation} /></p></div>}
      </div>
      <div className={viewReason ? styles.descriptions : styles.descriptionsHidden}>{description.length <= 1 ? <p className={styles.descript}>{description[0].reason}</p> : description.map((descript, i) => { return <p className={styles.descript}>{descript.reason}</p>})}</div>
    </div>
    </>
  )
}

export default LineCard