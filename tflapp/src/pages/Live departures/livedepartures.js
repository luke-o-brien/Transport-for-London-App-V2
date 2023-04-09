import StationSearchBar from "../../Components/stationSearch/stationSearchBar.js"
import styles from "./livedepartures.module.scss"
import React from "react"


function LiveDepartures() {

  return (
    <>
    <div className={styles.searchContainer}>
      <StationSearchBar/>
    </div>
    </>
  )
}


export default LiveDepartures