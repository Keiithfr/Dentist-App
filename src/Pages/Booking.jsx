import { useParams } from "react-router-dom";
import BookingForm from '../Components/BookingForm/BookingForm'

const Booking = () => {
    const { id } = useParams()

    return (
        <div className="booking"> 
            <h2>Booking Dentist ID:{id}</h2>
            <BookingForm dentistId={id} />
        </div>
    )
}


export default Booking