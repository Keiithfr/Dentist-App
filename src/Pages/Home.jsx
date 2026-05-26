import { Dentists } from "../Data/Dentists";
import DentistCard from '../Components/DentistCard/DentistCard'


const Home = () => {
    return (
        <div className="home">
            <div className="h1-div">
                <h1>Modern Care for a <br />
                    Perfect Smile</h1>
            </div>

            {Dentists.map((D) => (
                <DentistCard key={D.id}{...D} />
            ))}
        </div>
    )
}

export default Home