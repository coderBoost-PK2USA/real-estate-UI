import "./PropertyDetails.css"
import {useNavigate, useParams} from "react-router";
import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import {OFFER_URL, PROPERTY_URL} from "../../constants/endpoints";
import {Link} from "react-router-dom";
import {getAuthHeader, initializeAuthState, isTokenExpired, isUserRole, logoutAuthState} from "../AuthServices/Auth";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import UserDetails from "../UserDetails/UserDetails";
import {CustomerOffersContext} from "../../Context/CustomerOffersContext";

function PropertyDetails() {

    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const params = useParams();
    const [propertyDetails, setPropertyDetails] = useState({});
    const propertyId = params.id;
    const [user, setUser] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [show, setShow] = useState(false);
    const refMakeOffer = useRef();
    const [offers, setOffers] = useContext(CustomerOffersContext);


    const fetchPropertyById = () => {
        axios.get(`${PROPERTY_URL}/${propertyId}`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(response => setPropertyDetails(response.data))
            .catch(error => console.log("Error while fetching property details, error = " + error.message))
    }

    useEffect(() => {
        initializeAuthState(token, setIsLogin, setUser);
        fetchPropertyById();
    }, [propertyId, token])

    const handleManageOffers = () => {
        navigate(`/manage-property/${propertyId}/offers`, {state: {propertyStatus: propertyDetails.status}})
    }

    const deletePropertyById = () => {
        axios.delete(`${PROPERTY_URL}/${propertyId}`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(() => navigate("/home"))
            .catch(error => console.log("Error while deleting property, error = " + error.message))
    }
    const handleDeleteOnClick = () => {
        if (propertyDetails.status === "PENDING") {
            alert("Property can't be deleted in PENDING state!")
        } else {
            deletePropertyById();
        }
    }

    const handleMakeOffer = () => {
        if (!isLogin) {
            alert('Login to Make an offer to the owner');
            navigate('/login')
        }
        if (!isOfferAlreadyMade())
            handleShow();
        else {
            alert("You already Offered the Owner for this Property!");
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // mark at DB
    const markPropertyOffer = () => {

        handleClose();
        if (isTokenExpired(token)) {
            logoutAuthState(user);
            navigate('/')
        }

        const amount = refMakeOffer.current['offer-amount'].value;
        const requestBody = {
            customerId: user.userId,
            ownerId: propertyDetails.ownerId,
            propertyId: propertyId,
            amount: amount

        };

        axios.post(OFFER_URL, requestBody, {headers: getAuthHeader(token)}
        )
            .then(response => {
                console.log(response);
                navigate("/my-offers")
            })
            .catch(error => {
                console.log(error);
            })

    }

    const isOfferAlreadyMade = () => {
        console.log("**************************")
        return offers.some(o => o.propertyName === propertyDetails.name && o.ownerUserId === propertyDetails.ownerUserId)
    }

    return (
        <>
            <div className="PropertyDetails">
                <h3>Property Details</h3>
                <img src={require('../../images/property.jpg')} width={400} height={350}/>
                <img src={require('../../images/property-2.jpeg')} width={400} height={350}/>
                <h5>Name: {propertyDetails.name}</h5>
                <h5>Category: {propertyDetails.category}</h5>
                <h5>Detail: {propertyDetails.detail}</h5>
                <label>{propertyDetails.status}</label>
                <h5>Price: {propertyDetails.price}$</h5>
                <h5>Address: {propertyDetails.address}</h5>

                {isUserRole(user, 'OWNER') ? (
                    <>
                        <button onClick={handleManageOffers}>Manage Offers</button>
                        <br/>
                        <button onClick={handleDeleteOnClick}>Delete Property</button>
                        <br/>
                    </>
                ) : (
                    <>
                        <UserDetails userId={propertyDetails.ownerUserId}/>
                        <button onClick={handleMakeOffer}> {isOfferAlreadyMade() ? "Offered" : "Make an Offer"}</button>
                    </>
                )}
                <h3><Link to="/home" className="link">Back</Link></h3>
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Make Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form ref={refMakeOffer}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Enter Amount in USD</Form.Label>
                            <Form.Control name='offer-amount'
                                          type="text"
                                          placeholder="10000"
                                          autoFocus
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={markPropertyOffer}>
                        Offer
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    );

}

export default PropertyDetails;