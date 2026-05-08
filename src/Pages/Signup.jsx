import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

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

            login(data.token);
            setForm({ email: "", password: "" })
            navigate("/bookings");

        } catch (err) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <h2>Signup</h2>
            <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
                disabled={loading} />
            <input
                name="password"
                type="password"
                placeholder="password"
                onChange={handleChange}
                value={form.password}
                disabled={loading} />
            <button type="submit" disabled={loading}>{loading ? "Creating account..." : "Sign up"}</button>
            <p>
                Already have an account?<Link to="/Login">Login</Link>
            </p>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Signup;