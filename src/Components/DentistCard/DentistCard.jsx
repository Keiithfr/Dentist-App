import { useNavigate } from "react-router-dom";
import styles from './DentistCard.module.css'
const DentistCard = ({ id, name }) => {
    const navigate = useNavigate()

    return (
        <div className={styles.dentistcard}>
            <p>{name}</p>

            <button onClick={() => navigate(`/booking/${id}`)}>Book</button>
        </div>
    )

}

export default DentistCard