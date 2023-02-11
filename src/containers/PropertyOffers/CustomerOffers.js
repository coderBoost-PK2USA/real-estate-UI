import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {CUSTOMER_URL} from "../../constants/endpoints";
import {getAuthHeader, initializeAuthState, isUserRole} from "../../components/AuthServices/Auth";
import {useNavigate} from "react-router";
import HistoryOffers from "../../components/PropertyOffer/CustomerHistoryOffer";
import {CurrentUserContext} from "../../Context/CurrentUserContext";

const CustomerOffer =()=> {

    const token = localStorage.getItem("token");
    const [user, setUser] = useContext(CurrentUserContext);
    const [offers, setOffers] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        initializeAuthState(token, setIsLogin, setUser);
        fetchCustomerOffers();

    }, []);


    const fetchCustomerOffers = () => {

        if(isUserRole(user,"CUSTOMER")) {
            axios.get(`${CUSTOMER_URL}/${user.userId}/offers`, {headers: getAuthHeader(token)})
                .then(response => {
                    setOffers(response.data)
                    console.log(response.data);
                })
                .catch(error => console.log(error))

        }
        else navigate('/')
    }

    const offersList = offers.map(o =>
        <HistoryOffers id={o.id} key={o.id} propertyName={o.propertyName} propertyDetails={o.propertyDetails}
                       offerStatus={o.status} offeredPrice={o.amount} ownerName={o.ownerName}
                       ownerId={o.ownerId} date={o.createdAt}
        />
    );

    return (
        <>
            <h1>My Offers</h1>
            <div className="history-offer">
                {offersList}
            </div>
        </>
    )
}

export default CustomerOffer