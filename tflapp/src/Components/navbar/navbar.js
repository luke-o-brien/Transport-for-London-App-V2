import styles from './navbar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
    <div className={styles.navbar}>
    <FontAwesomeIcon icon={faBars} className={styles.burgerIcon} onClick={(() => setMenuOpen(!menuOpen))} />
    </div>
    <ul className={ menuOpen ? styles.navbarLinkContainer : styles.navbarSideMenuHidden}>
      <Link  to="/" className={styles.linkItem}>Home</Link>
      <Link  to="/livedepartures"className={styles.linkItem}>Live departures</Link>
      <Link to="/serviceUpdates" className={styles.linkItem}>Service Updates</Link>
      <Link to="/" className={styles.linkItem}>Journey planner</Link>
    </ul> 
    </>
  )
}

export default Navbar