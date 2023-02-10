import Header from "../../components/Header/Header";
import PageRoutes from "./PageRoutes";
import {useState} from "react";
import {CurrentUserContext} from "../../Context/CurrentUserContext";

function Home() {

    const [currentUser, setCurrentUser] = useState([]);

    return (
        <>
            <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
                <Header/>
                <div className="container">
                    <PageRoutes/>
                </div>
            </CurrentUserContext.Provider>

        </>
    )
}

export default Home