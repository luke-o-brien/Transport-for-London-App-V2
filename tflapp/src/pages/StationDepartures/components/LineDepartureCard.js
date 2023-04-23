import react from "react";
import { useState } from "react";
import styles from "./LineDepartureCard.module.scss"
import { departureLinesArray } from "../../../data/apiCallVariables";

const LineDeparture = ({line, atco}) => {
  const [departuresOutbound, setDeparturesOutbound] = react.useState(undefined)
  const [departuresInbound, setDeparturesInbound] = useState([]) 
  const inbound = []
  const outbound = []
  react.useEffect(() => {
    async function getLiveDepartures() {
      if(departureLinesArray.includes(line)) {
        const resp = await fetch(`https://api.tfl.gov.uk/Line/${line}/Arrivals/${atco}`)
        const departureData = await resp.json()
        const sorted = departureData.sort((a, b) => a["timeToStation"] -  b["timeToStation"]);
        console.log(sorted)
        sorted.forEach(departure => {
          if (departure.direction === "inbound") {
            inbound.push(departure)
            setDeparturesInbound(inbound)
          } else if (departure.direction === "outbound") {
            outbound.push(departure)
            setDeparturesOutbound(outbound)
          }
        });
      }  
    }
    getLiveDepartures()
  }, [line, atco]);

  return ( 
    departuresOutbound && departuresInbound ? 
    <div className={styles.lineDepartures}>
      <div className={styles.LDCtitle} style={{backgroundColor: `var(--${line})`}}><h3 className={styles.lineTitle}>{(line).charAt(0).toUpperCase() + line.slice(1)}</h3></div>
      {departuresOutbound ? 
      <div className={styles.lineSection}>
          <h3 className={styles.directionHeading}>{departuresOutbound[0].platformName}</h3>    
        <div className={styles.LDCvariables}><p>Destination</p><p>Due in</p></div>
        {departuresOutbound.slice(0, 4).map((service, idx) => {
          return <div key={idx} className={styles.LDCservice} >
            { line === "dlr" ? <p>{service.destinationName}</p> : <p>{service.towards} </p>}
            <p>{service.timeToStation < 30 ? "Approaching" : `${Math.floor(service.timeToStation / 60)} Mins`}</p>
          </div>
        })} 
      </div> : null}
      {departuresInbound ? 
      <div>
        <h3 className={styles.directionHeading}>{departuresInbound[0].platformName}</h3>    
        <div className={styles.LDCvariables}><p>Destination</p><p>Due in</p></div>
        {departuresInbound.slice(0, 4).map((service, idx) => {
          return <div key={idx} className={styles.LDCservice} >
            { line === "dlr" ? <p>{service.destinationName}</p> : <p>{service.towards} </p>}
            <p>{service.timeToStation < 30 ? "Approaching" : `${Math.floor(service.timeToStation / 60)} Mins`}</p>
          </div>
        })} 
      </div> : null}

    </div>
      : null
  )
}

export default LineDeparture