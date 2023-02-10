import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {OWNER_URL} from "../../constants/endpoints";
import {CurrentUserContext} from "../../Context/CurrentUserContext";
import {Link} from "react-router-dom";
import Property from "../../components/Property/Property";

function OwnerProperties() {

    const token = localStorage.getItem("token");
    const [currentUser] = useContext(CurrentUserContext);
    const [ownerDetailsState, setOwnerDetailsState] = useState({});

    const fetchOwnerByUserId = () => {
        axios.get(`${OWNER_URL}/userid/${currentUser.userId}`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(response => {
                localStorage.setItem("ownerId", response.data.id)
                fetchOwnerProperties(response.data.id)
            })
            .catch(error => console.log("Error while fetching owner by userId, error = " + error.message))
    }
    useEffect(() => fetchOwnerByUserId(), [currentUser.userId]);

    const fetchOwnerProperties = (ownerId) => {
        axios.get(`${OWNER_URL}/${ownerId}`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(response => {
                setOwnerDetailsState(response.data)
            })
            .catch(error => console.log("Error while fetching properties for owner, error = " + error.message))
    }

    let propertiesComponents = null
    if (ownerDetailsState.propertyDetails !== undefined) {
        propertiesComponents = ownerDetailsState.propertyDetails.properties.map(p =>
            <Link to={`/manage-property/${p.id}`} key={p.id}>
                <Property id={p.id} key={p.id} name={p.name} category={p.category} price={p.price} address={p.address}
                          image={p.images[0]}
                />
            </Link>
        );
    }

    return (
        <>
            <h1>Manage Properties</h1>
            <div className="Property">
                {propertiesComponents}
            </div>
        </>
    )
}

export default OwnerProperties