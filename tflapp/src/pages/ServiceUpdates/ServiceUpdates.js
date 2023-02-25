import React from "react";
import { useEffect, useState } from "react";
import LineCard from "./components/LineCard";
import styles from "./ServiceUpdates.module.scss"

function ServiceUpdates() {

  const apiVariables = {
    TFLLines: "tube,overground,dlr,tram,elizabeth-line",
    River: "river-bus",
    Bus: "bus"
  }
  const [linestatus, setLineStatus] = useState(undefined)
  const [mode, setMode ] = useState(apiVariables.TFLLines)
  
  useEffect(() => {
    async function GetServiceData() {
      const response = await fetch(`https://api.tfl.gov.uk/line/mode/${mode}/status/`)
      const data = await response.json()
      console.log(data)
      setLineStatus(data)
    }
    GetServiceData()
  }, [mode]);


  return (
    <>
    <h1>Service updates</h1>
    <div className={styles.modeContainer}>
    <button className={ mode === apiVariables.TFLLines ? styles.modeButtonActive : styles.modeButton} onClick={(() => setMode(apiVariables.TFLLines))}>TFL Lines</button>
    <button className={ mode === apiVariables.River ? styles.modeButtonActive : styles.modeButton} onClick={(() => setMode(apiVariables.River))}>River</button>
    <button className={ mode === apiVariables.Bus ? styles.modeButtonActive : styles.modeButton} onClick={(() => setMode(apiVariables.Bus))}>Bus</button>
    </div>
    <div className={styles.linestatusContainer}>
    {linestatus && linestatus.map((line, i) => {
      return (
        <LineCard key={i} 
        line={line.name} 
        status={line.lineStatuses[0].statusSeverityDescription}
        description={line.lineStatuses[0].reason}
        id={line.id}
        statusSeverity={line.lineStatuses[0].statusSeverity}
        />
      )})}
    </div>
    </>
  )
}

export default ServiceUpdates