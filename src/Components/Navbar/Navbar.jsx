import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTooth, faBars } from '@fortawesome/free-solid-svg-icons';
import styles from "./Navbar.module.css";
import { useEffect } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        console.log(styles)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        window.location.reload();  //refresh UI state
    };
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}><FontAwesomeIcon icon={faTooth} className={styles.icon} /><p>Denta</p></div>

            <div className={styles.navLinks}>
                <Link to="/" className={styles.link}>Home</Link>

                {token ? (
                    <>
                        <Link to="/bookings" className={styles.link}>Bookings</Link>
                        <button onClick={handleLogout} className={styles.button}>Logout</button>
                    </>
                ) : (
                    <>

                        <Link to="/signup" className={styles.link}>Signup</Link>
                        <Link to="/login" className={styles.link}>Login</Link>
                    </>
                )}

            </div>
        </nav>
    );
};

export default Navbar