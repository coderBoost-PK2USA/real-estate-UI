import "./PropertyDetails.css"
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import {PROPERTY_URL} from "../../constants/endpoints";
import {Link} from "react-router-dom";


function PropertyDetails() {

    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const params = useParams();
    const [propertyDetails, setPropertyDetails] = useState({});
    const propertyId = params.id;

    const fetchPropertyById = () => {
        axios.get(`${PROPERTY_URL}/${propertyId}`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(response => setPropertyDetails(response.data))
            .catch(error => console.log("Error while fetching property details, error = " + error.message))
    }

    useEffect(() => fetchPropertyById(), [propertyId])

    const handleManageOffers = () => {
        navigate(`/manage-property/${propertyId}/offers`)
    }

    const deleteEmployeeById = () => {
        axios.delete(`${PROPERTY_URL}/${propertyId}`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(() => navigate("/home"))
            .catch(error => console.log("Error while deleting property, error = " + error.message))
    }
    const handleDeleteOnClick = () => {
        deleteEmployeeById();
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
                <button onClick={handleManageOffers}>Manage Offers</button>
                <br/>
                <button onClick={handleDeleteOnClick}>Delete Property</button>
                <br/>
                <h3><Link to="/home" className="link">Back</Link></h3>
            </div>
        </>
    );

}

export default PropertyDetails