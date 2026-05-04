import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            });

            const data = await res.json()
            if (!res.ok) throw new Error(data.message);

            //Store token
            localStorage.setItem("token", data.token);

            navigate("/bookings")
        } catch (err) {
            setMessage(err.message)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <input
                name="email"
                placeholder="Email"
                onChange={handleChange} />
            <input
                name="password"
                type="password"
                placeholder="password"
                onChange={handleChange} />

            <button type="submit">Login</button>
            <p>
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>
            {message && <p>{message}</p>}
        </form >
    )

}

export default Login;