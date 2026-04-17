import { useEffect, useState } from "react";

const Bookings = () => {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/bookings`)
            .then(res => res.json())
            .then(data => setBookings(data));
    }, []);

    return (
        <div className="bookings">
            <h2>All Bookings</h2>

            {bookings.map((b) => (
                <div key={b.id} className="ind-bookings">
                    <p>{b.name}</p>
                    <p>{b.date}</p>
                    <p>{b.time}</p>
                </div>
            ))}
        </div>
    )
}

export default Bookings