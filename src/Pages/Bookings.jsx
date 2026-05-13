import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const { logout, token } = useContext(AuthContext);

    useEffect(() => {

        fetch(`${import.meta.env.VITE_API_URL}/bookings?`, {
            headers: {
                Authorization: `Bearer ${token}`,

            },
        })
            .then(res => {
                if (res.status === 401) {
                    logout();
                    navigate("/login");
                    return;
                }
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then(data => setBookings(data))
            .catch(err => console.error(err));

    }, []);

    return (
        <div className="bookings">
            <h2>All Bookings</h2>

            {
                bookings.map((b) => (
                    <div key={b._id} className="ind-bookings">
                        <p>{b.name}</p>
                        <p>
                            {new Date(b.appointmentTime).toLocaleString("en-KE", {
                                dateStyle: "medium",
                                timeStyle: "short",
                            })}

                        </p>



                    </div>
                ))
            }
        </div >
    )
}

export default Bookings