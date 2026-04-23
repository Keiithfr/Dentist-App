import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './BookingForm.module.css';

const BookingForm = ({ dentistId }) => {
    const [form, setForm] = useState({
        name: '',
        date: '',
        time: ''
    })
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")
    let userId = localStorage.getItem("userId");

    if (!userId) {
        userId = crypto.randomUUID()
        localStorage.setItem("userId", userId)
    }

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 3000);
            return () => clearTimeout(timer)
        }
    }, [message])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.name || !form.date || !form.time) {
            setMessage("Please fill in all the fields")
            setType("error")
            return
        }

        setLoading(true)

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...form,
                    dentistId,
                    userId,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message)

            setMessage("Booking successful")
            setType("success")
            setForm({ name: "", date: "", time: "" });
            setTimeout(() => {
                navigate("/bookings")
            }, 1000);
        } catch (err) {
            setMessage(err.message)
            setType("error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.bookingform}>
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input type="date" name="date" onChange={handleChange} />
            <input type="time" name="time" onChange={handleChange} />

            <button type="submit" disabled={loading}>
                {loading ? "Booking..." : "Book"}
            </button>

            {
                message && (
                    <p className={`${styles.message} ${styles[type]}`}>
                        {message}
                    </p>
                )
            }

        </form>


    )
}

export default BookingForm