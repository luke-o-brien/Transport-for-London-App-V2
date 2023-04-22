import react from "react";
import styles from "./LineDepartureCard.module.scss"
import { departureLinesArray } from "../../../data/apiCallVariables";

const LineDeparture = ({line, atco}) => {
  const [departures, setDepartures] = react.useState(undefined)
  react.useEffect(() => {
    async function getLiveDepartures() {
      if(departureLinesArray.includes(line)) {
        const resp = await fetch(`https://api.tfl.gov.uk/Line/${line}/Arrivals/${atco}`)
        const departureData = await resp.json()
        const sorted = departureData.sort((a, b) => a["timeToStation"] -  b["timeToStation"]);
        console.log(sorted)
        setDepartures(sorted)
      }  
    }
    getLiveDepartures()
  }, [line, atco]);

  return ( 
    departures ? 
      <div className={styles[line]}>
        { line === "dlr" ? <h3 className={styles.lineTitle}>{(line).toUpperCase()}</h3> : <h3 className={styles.lineTitle} >{(line).charAt(0).toUpperCase() + line.slice(1)}</h3>}
        <div className={styles.params}><p>Destination</p><p>Due in</p></div>
        {departures.slice(0, 5).map((service, pos) => {
          return <div key={pos} className={styles.serviceDiv} >
            { line === "dlr" ? <p>{service.destinationName}</p> : <p>{service.towards} </p>}
            <p>{Math.floor(service.timeToStation / 60)} Mins</p>
          </div>
        })} 
      </div> : null
  )
}

export default LineDeparture