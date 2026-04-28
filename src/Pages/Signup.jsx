import { useState } from "react";

const Signup = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

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

            setMessage("Signup successful.You can now log in.");

        } catch (err) {
            setMessage(err.message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <input
                name="email"
                placeholder="Email"
                onChange={handleChange} />
            <input
                name="password"
                placeholder="password"
                onChange={handleChange} />
            <button type="submit">Signup</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Signup;