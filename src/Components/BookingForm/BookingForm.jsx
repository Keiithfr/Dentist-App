import { useState } from "react";

const BookingForm = ({ dentistId }) => {
    const [form, setForm] = useState({
        name: '',
        date: '',
        time: ''
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!form.name || !form.date || !form.time) {
            alert('fill all the fields')
            return
        }

        const bookings = JSON.parse(localStorage.getItem('bookings')) || []

        const exists = bookings.find(
            (b) => b.date === form.date && b.time === form.time
        )

        if (exists) {
            alert('Time already booked')
            return
        }

        const newBooking = {
            ...form, dentistId, id: Date.now
        }

        bookings.push(newBooking)
        localStorage.setItem('bookings', JSON.stringify(bookings))
        alert('Booked!')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input type="date" name="date" onChange={handleChange} />
            <input type="time" name="time" onChange={handleChange} />

            <button type="submit">Book</button>
        </form>
    )
}

export default BookingForm