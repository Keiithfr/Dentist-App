import { Link } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.link}>Home</Link>
            <Link to="/bookings" className={styles.link}>Bookings</Link>
        </nav>
    )
}

export default Navbar