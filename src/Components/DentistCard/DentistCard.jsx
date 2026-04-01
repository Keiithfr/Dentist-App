import { useNavigate } from "react-router-dom";
const DentistCard = ({ id, name }) => {
    const navigate = useNavigate()

    return (
        <div>
            <p>{name}</p>

            <button onClick={() => navigate(`/booking/${id}`)}>Book</button>
        </div>
    )

}

export default DentistCard