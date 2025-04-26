import RakthveerLandingPage from "./components/LandingPage/RakthveerLandingPage"
import BloodDonationPlatform from "./components/MainPage/BloodDonationPlatform"
import DonorLogin from './components/DonorLoginPage/DonorLogin'
import './App.css'
import OrgLogin from './components/OrgLogin/InputDesign'
import { Route , Routes } from 'react-router-dom'
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<RakthveerLandingPage/>}/>
        <Route path="/login" element={<DonorLogin/>}/>
        <Route path="/main" element={<BloodDonationPlatform/>}/>
      </Routes>
    </>
  )
}

export default App
