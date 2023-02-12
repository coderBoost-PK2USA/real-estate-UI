import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {CUSTOMER_URL, PROPERTY_URL} from "../../constants/endpoints";
import {Link} from "react-router-dom";
import Property from "../../components/Property/Prooerty";
import {getAuthHeader, initializeAuthState, isUserRole} from "../../components/AuthServices/Auth";
import {CurrentUserContext} from "../../Context/CurrentUserContext";
import {CustomerOffersContext} from "../../Context/CustomerOffersContext";
import {useEffect, useState} from "react";
import {PROPERTY_URL} from "../../constants/endpoints";
import Property from "../../components/Property/Property";

function CustomerProperties() {

    const token = localStorage.getItem("token");
    const [propertiesState, setPropertiesState] = useState([]);
    const [offers, setOffers] = useContext(CustomerOffersContext);

    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useContext(CurrentUserContext);


    const fetchProperties = () => {
        axios.get(PROPERTY_URL, {headers: {"Authorization": `Bearer ${token}`}})
            .then(response => {
                setPropertiesState(response.data)
            })
            .catch(error => console.log("Error while fetching properties, error = " + error.message))
    }



    useEffect(() => {
        initializeAuthState(token, setIsLogin, setUser);
        fetchProperties();

    }, []);

    const propertiesComponents = propertiesState.map(p =>
        <Property id={p.id} key={p.id} name={p.name} category={p.category} price={p.price} address={p.address}
                  image={p.images[0]}
        />
    );

    return (
        <>
            <h1>Find your dream home with us!</h1>
            <div className="Property">
                {propertiesComponents}
            </div>
        </>
    )
}

export default CustomerProperties