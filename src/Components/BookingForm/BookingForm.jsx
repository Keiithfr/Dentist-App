import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import styles from './BookingForm.module.css'

const BookingForm = ({ dentistId }) => {
    const [form, setForm] = useState({
        name: '',
        date: '',
        time: ''
    })
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")

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

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!form.name || !form.date || !form.time) {
            setMessage("Please fill in all the fields")
            setType("error")
            return
        }

        const bookings = JSON.parse(localStorage.getItem('bookings')) || []

        const exists = bookings.find(
            (b) => b.date === form.date && b.time === form.time
        )

        if (exists) {
            setMessage('Time already booked')
            setType("error")
            return
        }

        const newBooking = {
            ...form, dentistId, id: Date.now
        }

        bookings.push(newBooking)
        localStorage.setItem('bookings', JSON.stringify(bookings))
        setMessage("Booking successful!")
        setType("success")
        setForm({ name: "", date: "" });

        setLoading(true);
        setTimeout(() => {
            setLoading(false)
            navigate("/bookings")

        }, 1000);
    }

    return (
        <form onSubmit={handleSubmit} className={styles.bookingform}>
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input type="date" name="date" onChange={handleChange} />
            <input type="time" name="time" onChange={handleChange} />

            <button type="submit">Book</button>

            {
                message && (
                    <p className={`${styles.message} ${styles[type]}`}>
                        {message}
                    </p>
                )
            }
            {/* why like this */}
        </form>


    )
}

export default BookingForm