import { Dentists } from "../Data/Dentists";
import DentistCard from '../Components/DentistCard/DentistCard'


const Home = () => {
    return (
        <div>
            <h1>Modern Care for a Perfect Smile</h1>

            {Dentists.map((D) => (
                <DentistCard key={D.id}{...D} />
            ))}
        </div>
    )
}

export default Home