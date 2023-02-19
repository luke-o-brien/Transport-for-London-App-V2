import React from "react";
import { useEffect, useState } from "react";
import LineCard from "./components/LineCard";
import styles from "./ServiceUpdates.module.scss"

function ServiceUpdates() {

  const [linestatus, setLineStatus] = useState(undefined)

  useEffect(() => {
    async function GetServiceData() {
      const response = await fetch("https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tram,elizabeth-line/status/")
      const data = await response.json()
      console.log(data)
      setLineStatus(data)
    }
    GetServiceData()
  }, []);

  return (
    <>
    <h1>ServiceUpdates</h1>
    {linestatus && linestatus.map((line, i) => {
      return (
        <LineCard key={i} 
        line={line.name} 
        status={line.lineStatuses[0].statusSeverityDescription}
        description={line.lineStatuses[0].reason}
        />
      )})}
    </>
  )
}

export default ServiceUpdates