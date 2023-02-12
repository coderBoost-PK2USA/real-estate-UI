import Header from "../../components/Header/Header";
import PageRoutes from "./PageRoutes";
import {useState} from "react";
import {CurrentUserContext} from "../../Context/CurrentUserContext";
import {WishlistContext} from "../../Context/WishlistContext";

function Home() {

    const [currentUser, setCurrentUser] = useState([]);
    const [customerWishlist, setCustomerWishlist] = useState([]);

    return (
        <>
            <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
                <WishlistContext.Provider value={{customerWishlist, setCustomerWishlist}}>
                    <Header/>
                    <div className="container">
                        <PageRoutes/>
                    </div>
                </WishlistContext.Provider>
            </CurrentUserContext.Provider>
        </>
    )
}

export default Home