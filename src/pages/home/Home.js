import Header from "../../components/Header/Header";
import PageRoutes from "./PageRoutes";
import {useState} from "react";
import {CurrentUserContext} from "../../Context/CurrentUserContext";
import {CustomerOffersContext} from "../../Context/CustomerOffersContext";
import {WishlistContext} from "../../Context/WishlistContext";


function Home() {

    const [currentUser, setCurrentUser] = useState([]);
    const [offers, setOffers] = useState([]);
    const [customerWishlist, setCustomerWishlist] = useState([]);

    return (
        <>
            <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
                <CustomerOffersContext.Provider value={[offers, setOffers]}>

                <WishlistContext.Provider value={{customerWishlist, setCustomerWishlist}}>
                    <Header/>
                    <div className="container">
                        <PageRoutes/>
                    </div>
                </WishlistContext.Provider>
                </CustomerOffersContext.Provider>
            </CurrentUserContext.Provider>
        </>
    )
}

export default Home