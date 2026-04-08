import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import Booking from './Pages/Booking'
import Bookings from './Pages/Bookings'
import Navbar from './Components/Navbar/Navbar'
import './Styles/Variables.css'

function App() {
  return (

    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>


    </>
  )
}

export default App