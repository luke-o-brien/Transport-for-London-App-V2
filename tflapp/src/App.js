
import { Route, Routes } from 'react-router-dom';
import { useTheme } from './appContext';
import LandingPage from './pages/landingPage/landingpage';
import LiveDepartures from './pages/Live departures/livedepartures'
import ServiceUpdates from './pages/ServiceUpdates/ServiceUpdates';
import './App.css';
import Navbar from './Components/navbar/navbar';


function App() {

  const theme = useTheme()
  console.log(theme)
  return (
    
    <div className="app" data-theme={theme} >
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/livedepartures" element={<LiveDepartures />} />
          <Route path="/serviceUpdates" element={<ServiceUpdates/>} />
        </Routes>
    </div>
  );
}

export default App;
