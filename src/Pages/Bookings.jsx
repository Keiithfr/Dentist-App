import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const { loading } = useContext(AuthContext);
    const [deletingId, setDeletingId] = useState(null);

    if (loading) {
        return <p>Loading...</p>
    }
    // if(!user){
    //     navigate("/login");
    //     return null;
    // }

    useEffect(() => {

        fetch(`${import.meta.env.VITE_API_URL}/bookings?`, {
            credentials: "include"
        })
            .then(res => {
                // if (res.status === 401) {
                //     logout();
                //     navigate("/login");
                //     return;
                // }
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then(data => setBookings(data))
            .catch(err => console.error(err));

    }, [navigate]);

    const handleDelete = async (id) => {

        setDeletingId(id);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/bookings/${id}`, {
                method: "DELETE",
                credentials: "include"
            }
            );

            if (!res.ok) {
                throw new Error("Failed to delete");
            }

            //Remove deleted booking from ui  

            setBookings(prev =>
                prev.filter(b => b._id !== id)
            );
        } catch (err) {
            console.error(err);
        }
        finally {
            setDeletingId(null);
        }
    }



    return (
        <div className="bookings">
            <h2>All Bookings</h2>

            {
                bookings.map((b) => (

                    <div key={b._id} className="bookings-main-div">

                        <div className="ind-bookings">
                            <p>{b.name}</p>
                            <p>
                                {new Date(b.appointmentTime).toLocaleString("en-KE", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}

                            </p>

                        </div>
                        <button onClick={() => handleDelete(b._id)} className="delete-btn" disabled={deletingId === b._id}>{deletingId === b._id ? "Deleting" : "Delete"} </button>
                    </div>



                ))
            }
        </div >
    )
}

export default Bookings