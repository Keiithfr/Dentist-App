import { useEffect, useState } from "react";

const Bookings = () => {
    const [bookings, setBookings] = useState([])
    let userId = localStorage.getItem("userId")
    if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem("userId", userId);
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/bookings?userId=${userId}`)
            .then(res => {
                if (!res.ok) throw new Errror("Failed to fetch");
                return res.json();
            })
            .then(data => setBookings(data))
            .catch(err => console.error(err));
        console.log("userId:", userId)
    }, [userId]);

    return (
        <div className="bookings">
            <h2>All Bookings</h2>

            {bookings.map((b) => (
                <div key={b._id} className="ind-bookings">
                    <p>{b.name}</p>
                    <p>{b.date}</p>
                    <p>{b.time}</p>
                </div>
            ))}
        </div>
    )
}

export default Bookings