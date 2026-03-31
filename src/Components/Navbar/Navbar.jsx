import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/bookings">Bookings</Link>
        </nav>
    )
}

export default Navbar