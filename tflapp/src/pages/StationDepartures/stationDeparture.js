
import react from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./stationDeparture.module.scss"
import LineDepartureCard from "./components/LineDepartureCard";
import { departureLinesArray } from "../../data/apiCallVariables";

const StationDepartures = () => {
  const [show, setshow] = useState("show")
  const [modeData, setModeData] = useState(undefined)
  const [displayLine, setDisplayLine] = useState(undefined)
  const [stationATCO, setStationATCO] = useState(undefined)
  const location = useLocation();
  const stationId = location.state;

  console.log(stationId);
    
  react.useEffect(() => {
    async function getStationData() {
      const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${stationId}`)
      const data = await response.json()
      setModeData(data)
      console.log(data.lineGroup.lineIdentifier)
    }
    getStationData()
  }, []);

  function handleClick(e) {
    const optionTextcase = e.target.innerHTML
    const optionText = optionTextcase.charAt(0).toLowerCase() + optionTextcase.slice(1);
    const optionValue = e.target.value
    setStationATCO(optionValue)
    setDisplayLine(optionText)
    setshow(optionText)
  }

  return ( modeData ?
    <div>
      <h2 className={styles.stationName}>{(modeData.commonName).replace("Underground Station", "")}</h2>
      <div className={styles.availableLineContainer}>
        {modeData.lineGroup.map((line, i) => {
          return line.lineIdentifier.map((linename) => {
            return departureLinesArray.includes(linename)? 
              <button key={i} className={styles.availableLine} value={line.stationAtcoCode} onClick={handleClick} >{linename.charAt(0).toUpperCase() + linename.slice(1)}</button> 
              : null
          })
        })}
      </div>
      <div>
      <LineDepartureCard  
        line={displayLine} 
        atco={stationATCO}/>
      </div>
    </div> : <p>waiting on data</p>
  )
}

export default StationDepartures