import { useEffect, useState } from "react";

const Bookings = () => {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('bookings')) || []
        setBookings(data)
    }, [])

    return (
        <div>
            <h2>All Bookings</h2>

            {bookings.map((b) => (
                <div key={b.id}>
                    <p>{b.name}</p>
                    <p>{b.date}</p>
                    <p>{b.time}</p>
                </div>
            ))}
        </div>
    )
}

export default Bookings