
import react from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./stationDeparture.module.scss"
import LineDepartureCard from "./components/LineDepartureCard";

const StationDepartures = () => {
  const [show, setshow] = useState("show")
  const [modeData, setModeData] = useState(undefined)
  const [displayLine, setDisplayLine] = useState(undefined)
  const [stationATCO, setStationATCO] = useState(undefined)
  const location = useLocation();
  const state = location.state;

  console.log(state);
    
  react.useEffect(() => {
    async function getStationData() {
      const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${state}`)
      const data = await response.json()
      const _modeData = data
      console.log(data)
      console.dir(data)
      setModeData(_modeData)
      console.log(data.lineGroup.lineIdentifier)
    }
    getStationData()
  }, []);

  function handleClick(e) {
    
    console.log("clicked")
    const optionTextcase = e.target.innerHTML
    const optionText = optionTextcase.charAt(0).toLowerCase() + optionTextcase.slice(1);
    const optionValue = e.target.value
    console.log(optionValue)
    setStationATCO(optionValue)
    console.log(optionText)
    setDisplayLine(optionText)
    setshow(optionText)
    console.log(show)
  }

  return ( modeData ?
    <div>
      <h2 className={styles.stationName}>{(modeData.commonName).replace("Underground Station", "")}</h2>
      <div className={styles.availableLineContainer}>
        {modeData.lineGroup.map((line) => {
          return line.lineIdentifier.map((linename) => {
            return linename === "bakerloo" || linename === "central" || linename === "circle" || linename === "district" || linename === "hammersmith-city" || linename === "jubilee" || linename === "metropolitan" || linename === "northern" || linename === "piccadilly" || linename === "victoria" || linename === "dlr" || linename === "overground" ? 
              <button key={line.stationAtcoCode} className={styles.availableLine} value={line.stationAtcoCode} onClick={handleClick} >{linename.charAt(0).toUpperCase() + linename.slice(1)}</button> 
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