import axios from "axios";
import {useEffect, useState} from "react";
import {PROPERTY_URL} from "../../constants/endpoints";
import {Link} from "react-router-dom";
import Property from "../../components/Property/Property";

function CustomerProperties() {

    const token = localStorage.getItem("token");
    const [propertiesState, setPropertiesState] = useState([]);

    const fetchProperties = () => {
        axios.get(PROPERTY_URL, {headers: {"Authorization": `Bearer ${token}`}})
            .then(response => {
                setPropertiesState(response.data)
            })
            .catch(error => console.log("Error while fetching properties, error = " + error.message))
    }

    useEffect(() => fetchProperties(), []);

    const propertiesComponents = propertiesState.map(p =>
        <Link to={`#`} key={p.id}>
            <Property id={p.id} key={p.id} name={p.name} category={p.category} price={p.price} address={p.address}
                      image={p.images[0]}
            />
        </Link>
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