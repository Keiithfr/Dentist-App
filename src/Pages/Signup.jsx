import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message)

            localStorage.setItem("token", data.token);
            setForm({ email: "", password: "" })
            navigate("/bookings");

        } catch (err) {
            setMessage(err.message)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <h2>Signup</h2>
            <input
                name="email"
                placeholder="Email"
                onChange={handleChange} />
            <input
                name="password"
                type="password"
                placeholder="password"
                onChange={handleChange} />
            <button type="submit">Signup</button>
            <p>
                Already have an account?<Link to="/Login">Login</Link>
            </p>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Signup;