import styles from '../stationSearch/stationSearchBar.module.scss'
import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

function StationSearchBar() {
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
      <div className={styles.searchBarContainer}>
      <div>
        <input className={styles.inputField} onChange={getStationId}  value={name} placeholder="Enter Station eg. Oxford Circus" />
      </div> 
      <div className={styles.resultsContainer}>
      {stationdata ? stationdata.map((station) => {
      return (<div key={station.id}>
          <Link to={`/Livedepartures/${station.name}`} state={station.id} className={styles.linkContainer}>
            {station.modes.includes("tube" || "dlr") || station.modes.includes("dlr") || station.modes.includes("elizabeth-line") || station.modes.includes("overground")  ? 
              <div className={styles.nameContainer}>
                <p className={styles.name}>{(station.name).replace("Underground Station", "")}</p>
              </div> : null}
          </Link>
        </div>
      )}) : null}
      </div>
      </div>
    </>
      )}


export default StationSearchBar