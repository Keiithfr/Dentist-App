import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);


    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(form)
            });

            const data = await res.json()
            if (!res.ok) throw new Error(data.message);

        

            login(data.user);
            navigate("/bookings");
        } catch (err) {
            setMessage(err.message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
            <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                disabled={loading} />

            <input
                name="password"
                type="password"
                placeholder="password"
                onChange={handleChange}
                disabled={loading} />

            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}</button>
            <p>
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>
            {message && <p>{message}</p>}
        </form >
    )

};

export default Login;