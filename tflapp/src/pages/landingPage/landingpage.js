import React from "react"
import { Link } from "react-router-dom"
import styles from "./landingpage.module.scss"

function LandingPage() {
  return (
    <>
    <div>
      <h1 className={styles.heading}>London Transport Application</h1>
    </div>
    <div className={styles.buttonContainer}>
      <Link to="/serviceupdates" className={styles.button}>
        <p>Service Update</p>
      </Link>
      <div className={styles.button}>
        <p>Journey Planner</p>
      </div>
      <Link to="/livedepartures" className={styles.button}>
        <p>Live Departures</p>
      </Link>
    </div>
    </>
  )
}

export default LandingPage