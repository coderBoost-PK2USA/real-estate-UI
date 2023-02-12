import Header from "../../components/Header/Header";
import PageRoutes from "./PageRoutes";
import {useState} from "react";
import {CurrentUserContext} from "../../Context/CurrentUserContext";
import {CustomerOffersContext} from "../../Context/CustomerOffersContext";

function Home() {

    const [currentUser, setCurrentUser] = useState([]);
    const [offers, setOffers] = useState([]);

    return (
        <>
            <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
                <CustomerOffersContext.Provider value={[offers, setOffers]}>
                <Header/>
                <div className="container">
                    <PageRoutes/>
                </div>
                </CustomerOffersContext.Provider>
            </CurrentUserContext.Provider>

        </>
    )
}

export default Home