import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTooth, faBars } from '@fortawesome/free-solid-svg-icons';
import styles from "./Navbar.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);


    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}><FontAwesomeIcon icon={faTooth} className={styles.icon} /><p>Denta</p></div>
            <div className={styles.hamburger}
                onClick={() => setMenuOpen(!menuOpen)}
            ><FontAwesomeIcon icon={faBars} /></div>

            <div className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
                <Link to="/" className={styles.link} onClick={() => setMenuOpen(false)}>Home</Link>

                {user ? (
                    <>
                        <div className={styles.userInfo}>
                            <span className={styles.span}>Logged in as</span>
                            <p>{user.email}</p>
                        </div>

                        <Link to="/bookings" className={styles.link} onClick={() => setMenuOpen(false)}>Bookings</Link>
                        <button onClick={async () => {
                            await logout();
                            setMenuOpen(false)
                        }} className={styles.button}>Logout</button>

                    </>
                ) : (
                    <>


                        <Link to="/login" className={styles.link} onClick={() => setMenuOpen(false)}>Login</Link>
                        <Link to="/signup" className={styles.link} onClick={() => setMenuOpen(false)}>Signup</Link>

                    </>
                )}

            </div>
        </nav >
    );
};

export default Navbar