import styles from "./livedepartures.module.scss"
import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

function LiveDepartures() {
  const [stationdata, setStationData] = useState(undefined)
  const [name, setName] = useState("")

  async function getStationId(e) {
    const _name = e.target.value
    setName(_name);
    console.log(_name)
    const response = await fetch(`https://api.tfl.gov.uk/StopPoint/Search?query=${_name}`)
    const data = await response.json()
    setStationData(data.matches)
    console.log(stationdata)

  
  }


  return (
    <>
      <h2>Live Departures </h2>
      <div className={styles.searchBarContainer}>
      <div>
        <input className={styles.inputField} onChange={getStationId}  value={name} placeholder="Enter Station eg. Oxford Circus" />
      </div> 
      <div>
      {stationdata ? stationdata.map((station) => {
      return (<div key={station.id}>
          <Link to={`/Live-Departures/${station.name}`} state={station.id} style={{ textDecoration: "none" }}>
            {station.modes.includes("tube" || "dlr") || station.modes.includes("dlr") || station.modes.includes("elizabeth-line") || station.modes.includes("overground")  ? 
              <div className={styles.name_container}>
                <h3 className={styles.name}>{(station.name).replace("Underground Station", "")}</h3>
              </div> : null}
          </Link>
        </div>
      )}) : null}
      </div>
      </div>
    </>
      )}


export default LiveDepartures