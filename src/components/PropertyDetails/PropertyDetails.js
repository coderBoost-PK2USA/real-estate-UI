import "./PropertyDetails.css"
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import {PROPERTY_URL} from "../../constants/endpoints";
import {Link} from "react-router-dom";


function PropertyDetails() {

    const navigate = useNavigate()
    const params = useParams();
    const [propertyDetails, setPropertyDetails] = useState({});
    const propertyId = params.id;

    const fetchPropertyById = () => {
        axios.get(`${PROPERTY_URL}/${propertyId}`)
            .then(response => setPropertyDetails(response.data))
            .catch(error => console.log("Error while fetching property details, error = " + error.message))
    }

    useEffect(() => fetchPropertyById(), [propertyId])

    const deleteEmployeeById = () => {
        axios.delete(`${PROPERTY_URL}/${propertyId}`)
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
                { (propertyDetails.images) ? propertyDetails.images.forEach(i=>
                    <img src={require('../../images/property.jpg')} id={i.id} width={300} height={250}/>
                ): null}
                <img src={require('../../images/property.jpg')} width={300} height={250}/>
                <h6>Name: {propertyDetails.name}</h6>
                <h6>Category: {propertyDetails.category}</h6>
                <h6>Detail: {propertyDetails.detail}</h6>
                <h6 className="info">{propertyDetails.status}</h6>
                <h6>Price: {propertyDetails.price}$</h6>
                <h6>{propertyDetails.address}</h6>
                <button onClick={handleDeleteOnClick}>Delete Property</button>
                <br/>
                <Link to="/home">Back</Link>
            </div>
        </>
    );

}

export default PropertyDetails