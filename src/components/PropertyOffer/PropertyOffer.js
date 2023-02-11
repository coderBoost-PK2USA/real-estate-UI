import UserDetails from "../UserDetails/UserDetails";
import axios from "axios";
import {OFFER_URL, PROPERTY_URL} from "../../constants/endpoints";
import {useNavigate, useParams} from "react-router";
import {getAuthHeader} from "../AuthServices/Auth";

function PropertyOffer(props) {

    const token = localStorage.getItem("token");
    const params = useParams();
    const navigate = useNavigate();
    const propertyId = params.id

    const updatePropertyStatus = (updatedStatus) => {
        axios.put(`${PROPERTY_URL}/${propertyId}`, updatedStatus, {headers: getAuthHeader(token)})
            .then(() => console.log("update property success")
            )
            .catch(error => {
                console.error('Error while updating property status, error=', error.message);
            })
    }

    const updateOfferStatus = (offerId, updateStatus) => {
        axios.put(`${OFFER_URL}/${offerId}`, updateStatus, {headers: getAuthHeader(token)})
            .then(() => navigate(`/manage-property/${propertyId}`)
            )
            .catch(error => {
                console.error('Error while updating offer status, error=', error.message);
            })
    }

    const handleAcceptOnClick = (event) => {
        if (props.propertyStatus === "CONTINGENT") {
            alert("Offer has been finalized for this property")
        } else if (props.propertyStatus === "PENDING" && props.offerStatus !== "UNDER_PROCESS") {
            alert("1 offer already have been accepted")
        } else {
            let propertyStatus = "PENDING"
            let offerStatus = "UNDER_PROCESS"
            if (props.offerStatus === "UNDER_PROCESS") {
                propertyStatus = "CONTINGENT"
                offerStatus = "ACCEPTED"
            }
            updatePropertyStatus(propertyStatus)
            updateOfferStatus(event.target.id, offerStatus)
        }
    }

    const handleRejectOnClick = (event) => {
        const offerStatus = "REJECTED"
        if (props.propertyStatus === "PENDING" && props.offerStatus !== "UNDER_PROCESS") {
            updateOfferStatus(event.target.id, offerStatus)
        } else {
            const propertyStatus = "AVAILABLE"
            updatePropertyStatus(propertyStatus)
            updateOfferStatus(event.target.id, offerStatus)
        }
    }

    return (
        <div className="Content">
            <h5>Offer For => {props.propertyName} Property</h5>
            <h6>Details: {props.propertyDetails}</h6>
            <h6>Offered Price: {props.offeredPrice}$</h6>
            <h5>Offer Status: {props.offerStatus}</h5>
            <UserDetails userId={props.customerUserId}/>
            <div>
                {
                    (props.offerStatus === "ACCEPTED") ? null :
                        <button id={props.id} onClick={handleAcceptOnClick}>
                            {props.offerStatus === "UNDER_PROCESS" ? "Mark as Finalized" : "Accept"}
                        </button>
                }
                <button id={props.id} onClick={handleRejectOnClick}>Reject</button>
            </div>

        </div>
    );
}

export default PropertyOffer
