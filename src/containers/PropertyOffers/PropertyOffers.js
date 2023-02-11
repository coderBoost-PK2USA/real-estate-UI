import {useEffect, useState} from "react";
import axios from "axios";
import {OWNER_URL} from "../../constants/endpoints";
import {useLocation, useParams} from "react-router";
import PropertyOffer from "../../components/PropertyOffer/PropertyOffer";
import {Link} from "react-router-dom";

function PropertyOffers() {

    const token = localStorage.getItem("token");
    const ownerId = localStorage.getItem("ownerId");
    const params = useParams();
    const [offersState, setOffersState] = useState([]);
    const propertyId = params.id;
    const {state} = useLocation();
    const propertyStatus = state.propertyStatus;

    const fetchOwnerPropertyOffers = () => {
        axios.get(`${OWNER_URL}/${ownerId}/properties/${propertyId}/offers`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(response => {
                setOffersState(response.data)
            })
            .catch(error => console.log("Error while fetching owner's property offers, error = " + error.message))
    }
    useEffect(() => fetchOwnerPropertyOffers(), [ownerId, propertyId]);

    const offersComponents = offersState.map(o =>
        <PropertyOffer id={o.id} key={o.id} propertyName={o.propertyName} propertyDetails={o.propertyDetails}
                       offerStatus={o.status} offeredPrice={o.amount} customerName={o.customerName}
                       customerUserId={o.customerUserId} propertyStatus={propertyStatus}
        />
    );

    return (
        <>
            {(offersComponents.length > 0) ? <>
                <h1>Manage Offers</h1>
                <div className="Property">
                    {offersComponents}
                </div>
            </> : <h4>No Offers at the moment for this property</h4>}
            <Link to={`/manage-property/${propertyId}`} className="link">Back To Property Details</Link>
        </>
    )
}

export default PropertyOffers