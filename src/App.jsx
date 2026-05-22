import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import Booking from './Pages/Booking'
import Bookings from './Pages/Bookings'
import Navbar from './Components/Navbar/Navbar'
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PrivateRoute from "./Components/PrivateRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import './Styles/Variables.css'

function App() {

  const { loading } = useContext(AuthContext);
  if (loading) {
    return <div className="loading-screen">
      <p>Loading...</p>
    </div>
  }
  return (

    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />

        <Route path="/booking/:id" element={
          <PrivateRoute>
            <Booking />
          </PrivateRoute>} />

        <Route path="/bookings" element={
          <PrivateRoute>
            <Bookings />
          </PrivateRoute>}
        />
      </Routes>


    </>
  )
}

export default App