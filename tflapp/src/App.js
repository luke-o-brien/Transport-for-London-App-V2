
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage/landingpage';
import './App.css';
import { useTheme } from './appContext';

function App() {

  const theme = useTheme()
  console.log(theme)
  return (
    
    <div className={theme ? "night" : "day"}>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
        </Routes>
    </div>
  );
}

export default App;
