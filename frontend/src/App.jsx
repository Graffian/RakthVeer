import RakthveerLandingPage from "./components/LandingPage/RakthveerLandingPage"
import BloodDonationPlatform from "./components/MainPage/BloodDonationPlatform"
import DonorLogin from './components/DonorLoginPage/DonorLogin'
import BloodBankDashboard from "./components/OrgMain/BloodBankDashboard"
import './App.css'
import OrgLogin from './components/OrgLogin/InputDesign'
import InputDesign from "./components/ngoMain/InputDesign"
import { Route , Routes } from 'react-router-dom'
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<RakthveerLandingPage/>}/>
        <Route path="/login" element={<DonorLogin/>}/>
        <Route path="/main" element={<BloodDonationPlatform/>}/>
        <Route path="/orgLogin" element={<OrgLogin/>}/>
        <Route path="/orgMain" element={<BloodBankDashboard/>}/>
        <Route path="/ngoMain" element={<InputDesign/>}/>
      </Routes>
    </>
  )
}

export default App
