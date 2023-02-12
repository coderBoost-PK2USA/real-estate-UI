import {useContext, useEffect, useRef, useState} from "react";
import {getAuthHeader, initializeAuthState, isUserRole, logoutAuthState} from "../../components/AuthServices/Auth";
import HistoryOffers from "../../components/PropertyOffer/CustomerHistoryOffer";
import {CurrentUserContext} from "../../Context/CurrentUserContext";
import {CustomerOffersContext} from "../../Context/CustomerOffersContext";
import axios from "axios";
import {CUSTOMER_URL} from "../../constants/endpoints";
import {useNavigate} from "react-router";
import jsPDF from "jspdf";
import "jspdf-autotable";
const CustomerOffer = () => {

    const token = localStorage.getItem("token");
    const [user, setUser] = useContext(CurrentUserContext);
    const [offers, setOffers] = useContext(CustomerOffersContext);
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    const offersListRef = useRef();

    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            format: 'a1',
            unit: 'px',
        });

        // Adding the fonts.
        doc.setFont('Inter-Regular', 'normal');

        doc.html(offersListRef.current, {
            async callback(doc) {
                await doc.save('document');
            },
        });
    };


    useEffect(() => {
        initializeAuthState(token, setIsLogin, setUser);
        fetchCustomerOffers();
            }, [offers]);

    const fetchCustomerOffers = () => {

        // if(isUserRole(user,"CUSTOMER")) {
            axios.get(`${CUSTOMER_URL}/${user.userId}/offers`, {headers: getAuthHeader(token)})
                .then(response => {
                    setOffers(response.data)
                })
                .catch(error => console.log(error))
        // }
        //
        // else {
        //     alert("Please login to check your offers");
        //     logoutAuthState(user);
        //     navigate('/login');
        // }
    }




    const offersList = offers  && offers.length > 0
        ? offers.map(o => (
            <HistoryOffers
                id={o.id}
                key={o.id}
                propertyName={o.propertyName}
                propertyDetails={o.propertyDetails}
                offerStatus={o.status}
                offeredPrice={o.amount}
                ownerName={o.ownerName}
                ownerId={o.ownerId}
                date={o.createdAt}
            />
        ))
        : <>
            <h1>You didn't made any offer yet!</h1>
        </>;

    return (
        <>
            <h1>My Offers</h1>
            <button onClick={handleGeneratePdf }>Download PDF</button>
            <div className="history-offer" ref={offersListRef}>
                <div>
                {offersList}
                </div>



            </div>





        </>
    )
}

export default CustomerOffer